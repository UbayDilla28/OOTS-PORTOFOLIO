<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { copy, profile, projects, type Language } from '$lib/data';
	import ProjectRow from '$lib/components/ProjectRow.svelte';

	type Theme = 'light' | 'dark';
	type Status = 'idle' | 'loading' | 'success' | 'error';

	// Audio playback and theme-specific track switching.
	const musicSources: Record<Theme, string> = {
		light: '/audio/Akad.mp3',
		dark: '/audio/Shojo%20Rei.mp3'
	};

	let theme: Theme = $state('light');
	let status: Status = $state('idle');
	let language: Language = $state('id');
	let audioElement: HTMLAudioElement | undefined = $state();
	let isPlaying = $state(false);
	let audioError = $state(false);
	let volume = $state(0.25);

	async function playMusic() {
		if (!audioElement) return;

		audioElement.volume = volume;
		audioError = false;

		try {
			await audioElement.play();
		} catch (error) {
			console.error('Unable to play background audio:', error);
			audioError = true;
		}
	}

	async function toggleMusic() {
		if (!audioElement) return;

		if (isPlaying) {
			audioElement.pause();
			return;
		}

		await playMusic();
	}

	async function toggleTheme() {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		const resumePlayback = isPlaying;
		theme = nextTheme;
		audioError = false;

		if (!audioElement) return;

		audioElement.pause();
		audioElement.src = musicSources[nextTheme];
		audioElement.load();

		if (resumePlayback) await playMusic();
	}

	function updateVolume(event: Event) {
		volume = Number((event.currentTarget as HTMLInputElement).value);
		if (audioElement) audioElement.volume = volume;
	}
</script>

<div class="relative isolate min-h-dvh bg-bg text-ink {theme === 'dark' ? 'dark' : ''}">
	<!-- BG -->
	<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0">
		<img
			src={theme === 'dark' ? '/images/Miku-BG.gif' : '/images/Arona-BG.gif'}
			alt=""
			class="h-full w-full object-cover opacity-25"
		/>
	</div>

	<div class="relative z-10 min-h-dvh">
		<!-- nav -->
		<header class="border-b border-line">
			<div
				class="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-6 lg:h-[72px] lg:px-24"
			>
				<a href={resolve('/')} class="text-[15px] font-semibold lg:text-base">Uby34</a>

				<div class="flex items-center gap-2 lg:gap-8">
					<nav class="hidden items-center gap-7 lg:flex">
						<a href="#proyek" class="text-sm text-muted">{copy[language].projects}</a>
						<a href="#tentang" class="text-sm text-muted">{copy[language].about}</a>
						<a href="#kontak" class="text-sm text-muted">{copy[language].contact}</a>
					</nav>

					<button
						type="button"
						aria-label={copy[language].language}
						onclick={() => (language = language === 'id' ? 'en' : 'id')}
						class="flex h-11 min-w-11 items-center justify-center border border-line px-2 font-mono text-[11px] tracking-[1.1px]"
					>
						{language === 'id' ? 'EN' : 'ID'}
					</button>

					<button
						type="button"
						aria-label={copy[language].theme}
						onclick={toggleTheme}
						class="flex h-11 w-11 items-center justify-center border border-line"
					>
						<svg
							width="17"
							height="17"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="dark:hidden"
						>
							<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
						</svg>
						<svg
							width="17"
							height="17"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							class="hidden dark:block"
						>
							<circle cx="12" cy="12" r="4" />
							<path
								d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
							/>
						</svg>
					</button>

					<button
						type="button"
						aria-label={copy[language].menu}
						class="flex h-11 w-11 items-center justify-center border border-line lg:hidden"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						>
							<path d="M4 7h16M4 12h16M4 17h16" />
						</svg>
					</button>
				</div>
			</div>
		</header>

		<!-- hero -->
		<section class="mx-auto max-w-[1440px] px-6 pt-16 pb-14 lg:px-24 lg:pt-[120px]">
			<h1
				class="text-[58] leading-[0.88] font-medium tracking-[-1.6px] lg:text-[232px] lg:tracking-[-9px]"
			>
				Ubaydilla Alvaro Gibran Syahpalevi
			</h1>

			<div class="mt-7 flex flex-col gap-6">
				<p class="max-w-[560px] text-[17px] leading-[1.6] text-muted lg:text-xl">
					{copy[language].heroBio}
				</p>

				<div class="flex items-center gap-3">
					<a
						href="#proyek"
						class="flex h-12 items-center bg-primary px-6 text-[15px] font-medium text-on-primary"
					>
						{copy[language].viewProjects}
					</a>
					<a
						href="#kontak"
						class="flex h-12 items-center border border-line px-6 text-[15px] text-ink"
					>
						{copy[language].dontContact}
					</a>
				</div>

				<p class="font-mono text-[11px] tracking-[1.1px] text-muted">
					{copy[language].available}
				</p>

				<!-- audio -->
				<div class="flex flex-wrap items-center gap-3 border-t border-line pt-5">
					<audio
						bind:this={audioElement}
						src={musicSources[theme]}
						loop
						preload="none"
						onplay={() => (isPlaying = true)}
						onpause={() => (isPlaying = false)}
						onerror={() => {
							audioError = true;
							isPlaying = false;
						}}
					></audio>
					<button
						type="button"
						aria-label={isPlaying ? copy[language].pause : copy[language].play}
						onclick={toggleMusic}
						class="flex h-11 items-center gap-3 border border-line px-3 text-sm text-ink"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							{#if isPlaying}
								<path d="M9 5v14M15 5v14" />
							{:else}
								<path d="m8 5 12 7-12 7z" />
							{/if}
						</svg>
						<span>{copy[language].music}</span>
						<span class="flex h-4 items-center gap-0.5" aria-hidden="true">
							{#each [1, 2, 3, 4] as bar (bar)}
								<span
									class="w-0.5 bg-primary {isPlaying ? 'animate-pulse' : ''}"
									style="height: {bar * 3 + 3}px"
								></span>
							{/each}
						</span>
					</button>
					<label class="flex items-center gap-2 text-xs text-muted">
						<span class="sr-only">{language === 'id' ? 'Volume musik' : 'Music volume'}</span>
						<input
							type="range"
							min="0"
							max="1"
							step="0.05"
							value={volume}
							oninput={updateVolume}
							class="w-20 accent-primary"
						/>
					</label>
					{#if audioError}
						<p class="w-full text-xs text-danger" aria-live="polite">
							{copy[language].audioError}
							static/audio/{theme === 'dark' ? 'Shojo Rei.mp3' : 'Akad.mp3'}
						</p>
					{/if}
				</div>
			</div>
		</section>

		<!-- band -->
		<div class="border-t border-line">
			<img
				src={theme === 'dark' ? '/images/Miku-dark.jpg' : '/images/Tsurugi-light.jpg'}
				alt={copy[language].bannerAlt}
				class="h-[220px] w-full object-cover lg:h-[420px]"
			/>
			<div class="mx-auto max-w-[1440px] px-6 py-4 lg:px-24">
				<p class="font-mono text-[11px] tracking-[1.1px] text-muted">
					{copy[language].bannerCaption}
				</p>
			</div>
		</div>

		<!-- proyek -->
		<section id="proyek" class="border-t border-line">
			<div class="mx-auto max-w-[1440px] px-6 pt-5 pb-14 lg:px-24 lg:pb-24">
				<p class="font-mono text-[11px] tracking-[1.1px]">
					{copy[language].projects.toUpperCase()}
				</p>

				<div class="mt-7 flex flex-col divide-y divide-line lg:mt-10">
					{#each projects[language] as project, i (project.title)}
						<ProjectRow {project} index={i} openProjectLabel={copy[language].openProject} />
					{/each}
				</div>
			</div>
		</section>

		<!-- border -->
		<div class="border-y border-line" aria-hidden="true">
			<img
				src={theme === 'dark' ? '/images/Miku-border.jpg' : '/images/Tsurugi-border.jpg'}
				alt=""
				class="h-[150px] w-full object-cover opacity-80 lg:h-[220px]"
			/>
		</div>

		<!-- tentang -->
		<section id="tentang" class="border-t border-line">
			<div class="mx-auto max-w-[1440px] px-6 pt-5 pb-14 lg:px-24 lg:pb-24">
				<p class="font-mono text-[11px] tracking-[1.1px]">{copy[language].about.toUpperCase()}</p>

				<div class="mt-7 flex flex-col items-start gap-8 lg:mt-10 lg:flex-row lg:gap-24">
					<img
						src={theme === 'dark' ? '/images/potrait-dark.jpg' : '/images/potrait-light.jpg'}
						alt="Foto profil"
						class="h-[428px] w-full object-cover lg:h-[525px] lg:w-[420px]"
					/>

					<div class="flex w-full flex-col gap-7">
						<p class="max-w-[520px] text-[17px] leading-[1.6] text-muted lg:text-xl">
							{profile[language].bio}
						</p>

						<div class="flex flex-col divide-y divide-line">
							{#each profile[language].facts as fact (fact.label)}
								<div class="flex items-center justify-between gap-8 py-4">
									<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
										{fact.label}
									</span>
									<span class="text-[15px]">{fact.value}</span>
								</div>
							{/each}
						</div>

						<div class="flex flex-col gap-3">
							<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
								{copy[language].skills}
							</span>
							<div class="flex flex-wrap gap-2">
								{#each profile[language].skills as skill (skill)}
									<span
										class="border border-line px-2.5 py-[7px] font-mono text-[11px] tracking-[1.1px] text-muted"
									>
										{skill}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- kontak -->
		<section id="kontak" class="border-t border-line">
			<div class="mx-auto max-w-[1440px] px-6 pt-5 pb-14 lg:px-24 lg:pb-24">
				<p class="font-mono text-[11px] tracking-[1.1px]">{copy[language].contact.toUpperCase()}</p>

				<div class="mt-7 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:gap-24">
					<p class="max-w-[420px] text-[17px] leading-[1.6] text-muted lg:text-xl">
						{copy[language].contactPrompt}
					</p>

					<form
						method="POST"
						action="?/kirim"
						use:enhance={() => {
							status = 'loading';
							return async ({ result, update }) => {
								await update({ reset: result.type === 'success' });
								status = result.type === 'success' ? 'success' : 'error';
							};
						}}
						class="flex w-full flex-col gap-4 lg:w-[440px] lg:shrink-0"
					>
						<label class="flex flex-col gap-2">
							<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
								{copy[language].name}
							</span>
							<input
								name="nama"
								required
								autocomplete="name"
								placeholder={copy[language].namePlaceholder}
								class="h-12 w-full border border-line bg-bg px-3.5 text-[15px] outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
								{copy[language].email}
							</span>
							<input
								name="email"
								type="email"
								required
								autocomplete="email"
								placeholder="nama@email.com"
								class="h-12 w-full border border-line bg-bg px-3.5 text-[15px] outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
								{copy[language].message}
							</span>
							<textarea
								name="pesan"
								required
								rows="5"
								placeholder={copy[language].messagePlaceholder}
								class="min-h-[120px] w-full border border-line bg-bg px-3.5 py-3 text-[15px] outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary"
							></textarea>
						</label>

						<button
							type="submit"
							disabled={status === 'loading'}
							class="flex h-12 items-center justify-center gap-2 border px-6 text-[15px] font-medium {status ===
							'loading'
								? 'border-line bg-surface text-muted'
								: 'border-transparent bg-primary text-on-primary'}"
						>
							{#if status === 'loading'}
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									class="animate-spin"
								>
									<path d="M12 3a9 9 0 1 0 9 9" />
								</svg>
								{copy[language].sending}
							{:else}
								{copy[language].send}
							{/if}
						</button>

						{#if status !== 'idle'}
							<div class="flex items-center gap-3 border border-line px-4 py-3.5">
								{#if status === 'loading'}
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										class="animate-spin text-muted"
									>
										<path d="M12 3a9 9 0 1 0 9 9" />
									</svg>
									<span class="text-sm text-muted">{copy[language].sendingMessage}</span>
								{:else if status === 'success'}
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="text-success"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg>
									<span class="text-sm text-success">{copy[language].sent}</span>
								{:else}
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="text-danger"
									>
										<circle cx="12" cy="12" r="9" />
										<path d="M12 8v5M12 16.5v.01" />
									</svg>
									<span class="text-sm text-danger">{copy[language].sendError}</span>
								{/if}
							</div>
						{/if}
					</form>
				</div>
			</div>
		</section>

		<!-- footer -->
		<footer class="border-t border-line">
			<div class="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-14 lg:px-24">
				<p
					class="max-w-[640px] text-[34px] leading-[1.05] font-medium tracking-[-0.6px] lg:text-[48px] lg:tracking-[-1.2px]"
				>
					{copy[language].footerHeading}
				</p>

				<div
					class="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
				>
					<a
						href="mailto:deepyhappy@gmail.com"
						class="font-mono text-xs tracking-[1.1px] text-primary"
					>
						deepyhappy@gmail.com
					</a>
					<div class="flex items-center gap-6">
						<a href="#proyek" class="font-mono text-[11px] tracking-[1.1px] text-muted">
							{copy[language].projects.toUpperCase()}
						</a>
						<a
							href="https://github.com/UbayDilla28"
							target="_blank"
							rel="noreferrer"
							class="font-mono text-[11px] tracking-[1.1px] text-muted"
							>SOCIAL · {copy[language].github}</a
						>
						<a
							href="mailto:deepyhappy@gmail.com"
							class="font-mono text-[11px] tracking-[1.1px] text-muted"
						>
							EMAIL
						</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>
