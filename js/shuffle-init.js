// Customized by Amran Al Kerata
// email : amranalkerata@gmail.com

var Shuffle = window.Shuffle;

class ShuffleJS {
  constructor(element) {
    this.element = element;
    this.noItems = document.getElementById("shuffle-no-items");
    this.gridItems = this.element.querySelectorAll(".shuffle-item");
    this.shuffle = new Shuffle(element, {
      itemSelector: ".shuffle-item",
      sizer: element.querySelector(".my-sizer-element"),
      buffer: 1
    });
    this.currentTags = [];
    this.allItems = [];
    this.allItemsVisible = false;
  }

  /**
   * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
   * for them like you normally would (with jQuery for example).
   */

  addShuffleEventListeners() {
    this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
      console.log("layout. data:", data);
    });
    this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
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
    filterButtons.forEach((button) => {
      button.addEventListener("click", onClick, false);
    });
  }

  _handleFilterClick(evt) {
    // When you selected some tags for filter ==> show all items
    if (!this.allItemsVisible) {
      this.onAppendBoxes(this.allItems);
      this.allItemsVisible = true;
    }

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

  // Advanced filtering
  addSearchFilter() {
    const selectTags = $("#insightSearchSelect");

    // Handel Select & Remove Selected operations
    selectTags.on("select2:select", this._handleSelectTags.bind(this));
    selectTags.on("select2:unselect", this._handleUnSelectTags.bind(this));

    selectTags.select2();

    // Append border effect items
    $(".select2-selection--multiple.border-effect").after(
      '<span class="focus-border"><i></i></span>'
    );
  }

  _handleSelectFilter() {
    // When you selected some tags for filter ==> show all items
    if (!this.allItemsVisible) {
      this.onAppendBoxes(this.allItems);
      this.allItemsVisible = true;
    }

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

      // Get Current Element Tags
      const elementTags = JSON.parse(element.getAttribute("data-groups"));

      // Return Element if it's tags matched the search
      return elementTags.some((r) => this.currentTags.indexOf(r) >= 0);
    });
  }

  _handleSelectTags(e) {
    // Selected tag data
    const data = e.params.data;
    const selectedTag = data.text.trim().toLowerCase();

    // Add selected tag to  currentTags array
    this.currentTags.push(selectedTag);

    this._handleSelectFilter();

    // Check if there is any items if no show no items message
    if (this.shuffle.visibleItems == 0) {
      this.noItems.className = "d-block";
    } else {
      this.noItems.className = "d-none";
    }

    // Add Border Effect
    $(".select2-selection--multiple.border-effect").addClass("active");
  }

  _handleUnSelectTags(e) {
    // Get the id of removed tag
    const tagText = e.params.data.text;

    // remove the removed tag from the currentTags array
    const newTags = this.currentTags.filter((tag) => tag != tagText);

    // Set current tags to the new filtered tags
    this.currentTags = newTags;

    // Check if we have tags selected from drop down menu, if no show all items [Remove Filter]
    if (newTags.length === 0) {
      // Return all items
      this.shuffle.filter(Shuffle.ALL_ITEM);
      // Remove border effect
      $(".select2-selection--multiple.border-effect").removeClass("active");
    } else {
      this._handleSelectFilter();
    }
    // Check if there is any items if no show no items message
    if (this.shuffle.visibleItems == 0) {
      this.noItems.className = "d-block";
    } else {
      this.noItems.className = "d-none";
    }
  }

  /**
 * Create some DOM elements, append them to the shuffle container, then notify
 * shuffle about the new items. You could also insert the HTML as a string.
 */
  onAppendBoxes(array = []) {
    const elements = array;

    elements.forEach((element) => {
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
