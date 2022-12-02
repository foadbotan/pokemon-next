# Pokedex

I built this app with **React**, **Next.js** and **Tailwind**, using data fetched from an external API.

The site is hosted on Netlify. You can view the live site https://www.bespokedex.com/.

### Build Setup

The home page contains a list of all Pokemon, and each Pokemon has its own details page.

The home page is server-side generated (SSG), allowing me to prefetch data from the API and serve a lightening fast static page.

Given the large number of Pokemon, using a similar SSG approach for the individual Pokemon pages would be suboptimal. The Pokemon pages are still server-side rendered but only at the time of each page request (SSR).

### Features added:

- 🔍Search by name or id
- ❌ Filter by type
- ♾ Infinite scrolling †

### Challenges overcome:

- Optimizing the number of API calls from 1,155 to 22
- Creating a custom useInfiniteScroll hook

  <div align="center">
    <img src="./screenshots/screenshot-home.png" width="600"/>
  </div>
  <div align="center">
    <img src="./screenshots/screenshot-page-top.png" width="300"/>
    <img src="./screenshots/screenshot-page-bottom.png" width="300"/>
  </div>

† I understand that infinite scrolling is a nightmare for performance without windowing. Given the nature of this project, I didn't feel it was necessary.

In a larger project, with actual users, I would implement windowing functionality or use something like [react-window](https://react-window.vercel.app/#/examples/list/fixed-size).
