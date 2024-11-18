document.addEventListener("DOMContentLoaded", () => {
    const menuButtons = document.querySelectorAll(".menu-button");
  
    menuButtons.forEach((button) => {
      const submenu = document.getElementById(button.getAttribute("aria-controls"));
  
      // Toggle submenu visibility on click
      button.addEventListener("click", () => {
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", !isExpanded);
        submenu.hidden = isExpanded;
      });
  
      // Show submenu when focusing on the button with keyboard
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const isExpanded = button.getAttribute("aria-expanded") === "true";
          button.setAttribute("aria-expanded", !isExpanded);
          submenu.hidden = isExpanded;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          submenu.hidden = false;
          button.setAttribute("aria-expanded", "true");
          submenu.querySelector("[role='menuitem']").focus();
        }
      });
  
      // Close submenu on pressing Escape
      submenu.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          submenu.hidden = true;
          button.setAttribute("aria-expanded", "false");
          button.focus();
        }
      });
  
      // Keyboard navigation within submenu
      const menuItems = submenu.querySelectorAll("[role='menuitem']");
      menuItems.forEach((item, index) => {
        item.addEventListener("keydown", (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextItem = menuItems[(index + 1) % menuItems.length];
            nextItem.focus();
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevItem = menuItems[(index - 1 + menuItems.length) % menuItems.length];
            prevItem.focus();
          }
        });
      });
  
      // Close submenu when clicking outside
      document.addEventListener("click", (e) => {
        if (!submenu.contains(e.target) && !button.contains(e.target)) {
          submenu.hidden = true;
          button.setAttribute("aria-expanded", "false");
        }
      });
  
      // Open submenu on hover (mouse users)
      button.addEventListener("mouseover", () => {
        submenu.hidden = false;
        button.setAttribute("aria-expanded", "true");
      });
  
      // Close submenu when mouse leaves
      button.addEventListener("mouseout", (e) => {
        if (!submenu.contains(e.relatedTarget)) {
          submenu.hidden = true;
          button.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
  