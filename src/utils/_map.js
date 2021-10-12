import _get from 'lodash/get';

const map = {
  mapPosts: (posts) => {
    return posts.map(post => ({
      id: _get(post, 'id'),
      title: _get(post, 'title.rendered'),
      content: _get(post, 'content.rendered'),
      position: _get(post, 'acf.project_position'),
      image: {
        id: _get(post, 'acf.project_title_image.id'),
        size: _get(post, 'acf.project_title_image.sizes'),
        alt: _get(post, 'acf.project_title_image.alt'),
        url: _get(post, 'acf.project_title_image.url')
      },
      images: _get(post, 'acf.project_images') 
        ? post.acf.project_images.map(image => {
            return {
              id: _get(image, 'ID'),
              size: _get(image, 'sizes'),
              alt: _get(image, 'alt'),
              url: _get(image, 'url')
            }
          }) 
        : ''
    }));
  },
  mapPage: (pages) => {
    return pages.map(page => ({
      id: _get(page, 'id'),
      slug: _get(page, 'slug'),
      title: _get(page, 'title.rendered'),
      content: _get(page, 'content.rendered'),
      image: {
        id: _get(page, 'acf.project_title_image.id'),
        size: _get(page, 'acf.project_title_image.sizes'),
        alt: _get(page, 'acf.project_title_image.alt'),
        url: _get(page, 'acf.project_title_image.url')
      },
      images: _get(page, 'acf.project_images') 
        ? page.acf.project_images.map(image => {
          return {
            id: _get(image, 'ID'),
            size: _get(image, 'sizes'),
            alt: _get(image, 'alt'),
            url: _get(image, 'url')
          }
        }) 
        : ''
    }));
  },
  mapMenu: (payload) => {
    return payload.map(menuItem => ({
      id: _get(menuItem, 'ID'),
      title: _get(menuItem, 'title'),
      url: _get(menuItem, 'url'),
      path: getUrlPath(_get(menuItem, 'url'))
    }));
  },
  mapOptions: (payload) => ({
    hero: _get(payload, 'acf.hero_text')
  })
}

const getUrlPath = (absoluteLink) => {
  const url = new URL(absoluteLink);
  return url.pathname;
}

export default {
  posts: map.mapPosts,
  page: map.mapPage,
  menu: map.mapMenu,
  options: map.mapOptions
}