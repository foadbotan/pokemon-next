# Pokedex

I built this app with React, Next.js and Tailwind. It uses an external API for the Pokemon data.

The home page contains a list of all Pokemon, and each Pokemon has its own details page.

The home page is server-side generated (SSG), allowing me to prefetch data from the Pokemon API and serve a lightening fast static page.

Given the large number of Pokemon, a similar SSG approach was suboptimal. The individual Pokemon pages are still server-side rendered but only at the time of each page request (SSR).

### Features added:

- 🔍Search by name or id
- ❌ Filter by type
- ♾ Infinite scrolling to load more

### Difficulties faced:

- Optimizing the number of API calls from 1,155 to 21
- Creating a custom useInfiniteScroll hook

<img src="screenshot.png" />
