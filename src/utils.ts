export const createShortLinkURL = (url: string) => `https://api.shrtco.de/v2/shorten?${new URLSearchParams({url})}`;

export const generateShortenedLink = async (link: string) =>
  fetch(link)
    .then((response) => response.json())
    .then(({result}: {result: {short_link: string}}) => {
      return result.short_link;
    });
