export const normaliseDataGrid = (data) =>
  data.map((e) => ({
    link: e.node.slug,
    showName: e.node.metadata.show_name,
    img: e.node.metadata.show_image.imgix_url,
  }));
