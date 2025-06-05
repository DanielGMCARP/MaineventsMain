// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileMenuClose = document.getElementById("mobileMenuClose")
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active")
  mobileMenuOverlay.classList.add("active")
  document.body.style.overflow = "hidden"
})

function closeMobileMenu() {
  mobileMenu.classList.remove("active")
  mobileMenuOverlay.classList.remove("active")
  document.body.style.overflow = ""
}

mobileMenuClose.addEventListener("click", closeMobileMenu)
mobileMenuOverlay.addEventListener("click", closeMobileMenu)

// Create Event Modal
const createEventBtn = document.getElementById("createEventBtn")
const createEventModal = document.getElementById("createEventModal")
const closeEventModal = document.getElementById("closeEventModal")
const cancelEventBtn = document.getElementById("cancelEventBtn")
const saveEventBtn = document.getElementById("saveEventBtn")
const createEventForm = document.getElementById("createEventForm")

createEventBtn.addEventListener("click", () => {
  createEventModal.classList.add("active")
  document.body.style.overflow = "hidden"
})

function closeModal() {
  createEventModal.classList.remove("active")
  document.body.style.overflow = ""
}

closeEventModal.addEventListener("click", closeModal)
cancelEventBtn.addEventListener("click", closeModal)

// Outside click to close modal
createEventModal.addEventListener("click", (e) => {
  if (e.target === createEventModal) {
    closeModal()
  }
})

// Save Event
saveEventBtn.addEventListener("click", () => {
  // Validate form
  if (createEventForm.checkValidity()) {
    // Here you would normally send the data to the server
    // For demo purposes, we'll just close the modal and show an alert
    alert("¡Evento creado con éxito!")
    closeModal()

    // Reset form
    createEventForm.reset()
  } else {
    // Trigger HTML5 validation
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    })
    createEventForm.dispatchEvent(submitEvent)
  }
})

// Edit and Delete Event Actions
const editButtons = document.querySelectorAll(".action-icon:nth-child(1)")
const deleteButtons = document.querySelectorAll(".action-icon:nth-child(2)")

editButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation()
    const eventCard = button.closest(".event-card")
    const eventTitle = eventCard.querySelector(".event-title").textContent
    alert(`Editando evento: ${eventTitle}`)
    // Here you would open the edit modal with the event data
  })
})

deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation()
    const eventCard = button.closest(".event-card")
    const eventTitle = eventCard.querySelector(".event-title").textContent
    if (confirm(`¿Estás seguro de que deseas eliminar el evento "${eventTitle}"?`)) {
      // Here you would send a delete request to the server
      eventCard.style.opacity = "0"
      eventCard.style.transform = "scale(0.8)"
      setTimeout(() => {
        eventCard.remove()
      }, 300)
    }
  })
})

// Event Card Click
const eventCards = document.querySelectorAll(".event-card")
eventCards.forEach((card) => {
  card.addEventListener("click", () => {
    const eventTitle = card.querySelector(".event-title").textContent
    alert(`Ver detalles del evento: ${eventTitle}`)
    // Here you would navigate to the event details page
  })
})

// User Menu Toggle (for future implementation)
const userMenuToggle = document.getElementById("userMenuToggle")
userMenuToggle.addEventListener("click", () => {
  alert("Menú de usuario: Mi perfil, Configuración, Cerrar sesión")
  // Here you would toggle the user dropdown menu
})

// Navigation Links
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()

    // Remove active class from all links
    navLinks.forEach((l) => l.classList.remove("active"))

    // Add active class to clicked link
    link.classList.add("active")

    // Here you would handle navigation to different sections
    const linkText = link.textContent
    console.log(`Navegando a: ${linkText}`)
  })
})

// Mobile Navigation Links
const mobileNavLinks = document.querySelectorAll(".mobile-menu-link")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()

    // Remove active class from all mobile links
    mobileNavLinks.forEach((l) => l.classList.remove("active"))

    // Add active class to clicked link
    link.classList.add("active")

    // Close mobile menu
    closeMobileMenu()

    // Here you would handle navigation to different sections
    const linkText = link.querySelector("span").textContent
    console.log(`Navegando a: ${linkText}`)
  })
})

// Filter and Sort buttons
const filterBtn = document.querySelector(".btn:has(.fa-filter)")
const sortBtn = document.querySelector(".btn:has(.fa-sort)")

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    alert("Funcionalidad de filtrado - Próximamente")
    // Here you would implement filtering logic
  })
}

if (sortBtn) {
  sortBtn.addEventListener("click", () => {
    alert("Funcionalidad de ordenamiento - Próximamente")
    // Here you would implement sorting logic
  })
}

// Notification icon click
const notificationIcon = document.querySelector(".notification-icon")
if (notificationIcon) {
  notificationIcon.addEventListener("click", () => {
    alert("Notificaciones:\n- Recordatorio: Evento mañana\n- Nuevo proveedor disponible\n- Tarea pendiente vence hoy")
    // Here you would show a notifications dropdown
  })
}

// Form validation enhancement
const formInputs = document.querySelectorAll(".form-control")
formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      input.style.borderColor = "var(--danger)"
    } else {
      input.style.borderColor = "var(--gray-300)"
    }
  })

  input.addEventListener("input", () => {
    if (input.style.borderColor === "var(--danger)" && input.value.trim()) {
      input.style.borderColor = "var(--gray-300)"
    }
  })
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Escape key to close modals
  if (e.key === "Escape") {
    if (createEventModal.classList.contains("active")) {
      closeModal()
    }
    if (mobileMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  }

  // Ctrl/Cmd + N to create new event
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault()
    createEventBtn.click()
  }
})

// Auto-hide notifications after some time
setTimeout(() => {
  const notificationBadge = document.querySelector(".notification-badge")
  if (notificationBadge && notificationBadge.textContent === "3") {
    notificationBadge.style.animation = "pulse 2s infinite"
  }
}, 3000)

// Add pulse animation for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`
document.head.appendChild(style)

// Initialize tooltips (simple implementation)
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]")
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = e.target.getAttribute("data-tooltip")
      tooltip.style.cssText = `
                position: absolute;
                background: var(--gray-800);
                color: white;
                padding: 0.5rem;
                border-radius: var(--radius-sm);
                font-size: 0.875rem;
                z-index: 1001;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `
      document.body.appendChild(tooltip)

      const rect = e.target.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px"

      setTimeout(() => (tooltip.style.opacity = "1"), 10)
    })

    element.addEventListener("mouseleave", () => {
      const tooltip = document.querySelector(".tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    })
  })
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initTooltips()
  console.log("MainEvent's App initialized successfully!")
})
