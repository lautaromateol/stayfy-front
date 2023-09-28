function filterByTitle(drivers, searchTitle) {
    if (!searchTitle) {
      return drivers;
    };
    const lowerSearchTitle = searchTitle.toLocaleLowerCase();
    const filteredDrivers = drivers.filter(({ title }) => {
      const title = filteredDrivers.toLocaleLowerCase();
      return title.includes(lowerSearchTitle);
    });
    return filteredDrivers;
  };

  module.exports = { filterByTitle };