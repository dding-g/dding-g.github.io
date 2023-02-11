export const allSlugsQuery = `*[defined(slug.current)][].slug.current`;
export const postQuery = `*[_type == "post" && slug.current == $slug]`;
