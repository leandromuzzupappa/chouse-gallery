import { DATO } from '../data/constants';
import { GraphQLClient } from 'graphql-hooks'

export const client = new GraphQLClient({
  url: "https://graphql.datocms.com/",
  headers: {
    // eslint-disable-next-line no-undef
    "Authorization": `Bearer ${DATO.token}`,
  }
});

const gallery = (gallery) => `all${gallery}Galleries {
    id
    headline
    image {
      id
      url
    }
    _status
    _firstPublishedAt
  }

  _all${gallery}GalleriesMeta {
    count
  }`;

export const HomepageQuery = `query Homepage {
  ${gallery("Illustration")}
  ${gallery("Photography")}
  ${gallery("StreetArt")}
  ${gallery("DigitalArt")}
}`;