var Shuffle = window.Shuffle;

class ShuffleJS {
  constructor(element) {
    this.element = element;
    this.gridItems = this.element.querySelectorAll(".shuffle-item");
    this.shuffle = new Shuffle(element, {
      itemSelector: ".shuffle-item",
      sizer: element.querySelector(".my-sizer-element"),
      buffer: 1
    });
    const callback = this.showItemsInViewport.bind(this);
    this.observer = new IntersectionObserver(callback, {
      threshold: 0.5
    });

    // Loop through each grid item and add it to the viewport watcher.
    for (let i = 0; i < this.gridItems.length; i++) {
      this.observer.observe(this.gridItems[i]);
    }

    // Add the transition class to the items after ones that are in the viewport
    // have received the `in` class.
    setTimeout(() => {
      this.addTransitionToItems();
    }, 100);

    // // // Log events.
    // this.addShuffleEventListeners();
    // this._activeFilters = [];
    // this.addFilterButtons();
    // this.addSorting();
    // this.addSearchFilter();
    // this.onAppendBoxes();
  }
  /**
   * Add the `in` class to the element after it comes into view.
   */
  showItemsInViewport(changes) {
    changes.forEach(function(change) {
      if (change.isIntersecting) {
        change.target.classList.add("in");
      }
    });
  }

  /**
   * Only the items out of the viewport should transition. This way, the first
   * visible ones will snap into place.
   */
  addTransitionToItems() {
    for (let i = 0; i < this.gridItems.length; i++) {
      const inner = this.gridItems[i].firstElementChild;
      inner.classList.add("picture-item__inner--transition");
    }
  }

  /**
   * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
   * for them like you normally would (with jQuery for example).
   */
  addShuffleEventListeners() {
    this.shuffle.on(Shuffle.EventType.LAYOUT, data => {
      console.log("layout. data:", data);
    });
    this.shuffle.on(Shuffle.EventType.REMOVED, data => {
      console.log("removed. data:", data);
    });
  }

  addFilterButtons() {
    const options = document.querySelector(".filter-options");
    if (!options) {
      return;
    }

    const filterButtons = Array.from(options.children);
    const onClick = this._handleFilterClick.bind(this);
    filterButtons.forEach(button => {
      button.addEventListener("click", onClick, false);
    });
  }

  _handleFilterClick(evt) {
    const btn = evt.currentTarget;
    const isActive = btn.classList.contains("active");
    const btnGroup = btn.getAttribute("data-group");

    this._removeActiveClassFromChildren(btn.parentNode);

    let filterGroup;
    if (isActive) {
      btn.classList.remove("active");
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add("active");
      filterGroup = btnGroup;
    }

    this.shuffle.filter(filterGroup);
  }

  _removeActiveClassFromChildren(parent) {
    const { children } = parent;
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].classList.remove("active");
    }
  }

  addSorting() {
    const buttonGroup = document.querySelector(".sort-options");
    if (!buttonGroup) {
      return;
    }
    buttonGroup.addEventListener("change", this._handleSortChange.bind(this));
  }

  _handleSortChange(evt) {
    // Add and remove `active` class from buttons.
    const buttons = Array.from(evt.currentTarget.children);
    buttons.forEach(button => {
      if (button.querySelector("input").value === evt.target.value) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    // Create the sort options to give to Shuffle.
    const { value } = evt.target;
    let options = {};

    function sortByDate(element) {
      return element.getAttribute("data-created");
    }

    function sortByTitle(element) {
      return element.getAttribute("data-title").toLowerCase();
    }

    if (value === "date-created") {
      options = {
        reverse: true,
        by: sortByDate
      };
    } else if (value === "title") {
      options = {
        by: sortByTitle
      };
    }
    this.shuffle.sort(options);
  }

  // Advanced filtering
  addSearchFilter() {
    const searchInput = document.querySelector(".js-shuffle-search");
    if (!searchInput) {
      return;
    }
    searchInput.addEventListener("keyup", this._handleSearchKeyup.bind(this));
  }

  /**
   * Filter the shuffle instance by items with a title that matches the search input.
   * @param {Event} evt Event object.
   */
  _handleSearchKeyup(evt) {
    const searchText = evt.target.value.toLowerCase();
    this.shuffle.filter((element, shuffle) => {
      // If there is a current filter applied, ignore elements that don't match it.
      if (shuffle.group !== Shuffle.ALL_ITEMS) {
        // Get the item's groups.
        const groups = JSON.parse(element.getAttribute("data-groups"));
        const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
        // Only search elements in the current group
        if (!isElementInCurrentGroup) {
          return false;
        }
      }
      const elementCategory = JSON.parse(
        element.getAttribute("data-groups")
      ).toString();

      console.log(elementCategory);

      return elementCategory.includes(searchText);

      // return elementCategory.indexOf(searchText) !== -1;
    });
  }

  /**
 * Create some DOM elements, append them to the shuffle container, then notify
 * shuffle about the new items. You could also insert the HTML as a string.
 */
  onAppendBoxes(array = []) {
    const elements = array;

    elements.forEach(element => {
      this.shuffle.element.appendChild(element);
    });

    // Tell shuffle elements have been appended.
    // It expects an array of elements as the parameter.
    this.shuffle.add(elements);
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   window.demo = new ShuffleJS(document.getElementById("shuffle-js-container"));
// });
