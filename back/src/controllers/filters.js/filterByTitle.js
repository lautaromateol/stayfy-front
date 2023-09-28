function filterByTitle(drivers, searchTitle) {
    if (!searchTitle) {
      return drivers;
    };
    const lowerSearchTitle = searchTitle.toLocaleLowerCase();
    const filteredDrivers = drivers.filter(({ title }) => {
      const bookTitle = title.toLocaleLowerCase();
      return bookTitle.includes(lowerSearchTitle);
    });
    return filteredDrivers;
  };

  module.exports = { filterByTitle };