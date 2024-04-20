<script lang="ts">
	import { page } from '$app/stores';

	export let title = 'James Huang';
	export let description =
		'Product-focused designer developing experiences and crafting identities.';
	export let bannerImage = '/banner-image.webp';
	export let siteName = 'James Huang';
	export let themeColor = '#141414';
	const favicon = '/favicon.ico';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="author" content={siteName} />
	<meta name="title" content={title} />
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<meta property="theme-color" content={themeColor} />
	<meta name="copyright" content="&copy;{new Date().getFullYear()} Clembs" />
	<!-- Google index -->
	<meta name="”robots”" content="”follow,index”" />
	<meta name="”googlebot”" content="”follow,index”" />
	<link rel="canonical" href={$page.url.href} />
	<!-- OpenGraph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={bannerImage} />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ClembsV" />
	<meta name="twitter:title" content={title} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<meta name="twitter:image" content={bannerImage} />
	<!-- Article stuff -->
	<!-- {#if blogPost}
		<meta name="byl" content="By Clément Voisin" />
		<meta name="article:author" content="Clément Voisin" />
		<meta name="pubdate" content={blogPost.createdAt.toISOString()} />
		<meta property="article:published_time" content={blogPost.createdAt.toISOString()} />
		{#if blogPost.tags?.length}
			<meta name="keywords" content={blogPost.tags.join(', ')} />
			{#each blogPost.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
		<meta property="article:section" content="Blog" />
	{/if} -->
	<!-- Icons -->
	<meta name="image" content={bannerImage} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>
