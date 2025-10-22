import { useEffect } from "react";

export const useVenueHighlight = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1);

        // Function to attempt highlighting with retries
        const attemptHighlight = (retryCount = 0) => {
          const maxRetries = 10; // Try up to 10 times

          // Try different element ID formats
          const element =
            document.getElementById(`venue-${elementId}`) ||
            document.getElementById(elementId) ||
            document.getElementById("other-venues");

          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });

            if (element.id.startsWith("venue-")) {
              element.classList.add("selected-venue");
            }
          } else if (retryCount < maxRetries) {
            // Retry after a short delay if element not found
            setTimeout(() => {
              attemptHighlight(retryCount + 1);
            }, 200);
          } else {
            console.info("No element found for hash after retries:", elementId);
          }
        };

        // Start the highlighting attempt
        setTimeout(() => {
          attemptHighlight();
        }, 100);

        // Also set up a MutationObserver to watch for venue elements being added
        const targetElement = document.getElementById("other-venues");
        if (targetElement) {
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === "childList") {
                const targetElement = document.getElementById(
                  `venue-${elementId}`,
                );
                if (
                  targetElement &&
                  !targetElement.classList.contains("selected-venue")
                ) {
                  targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  targetElement.classList.add("selected-venue");
                  observer.disconnect(); // Stop observing once we find and highlight
                }
              }
            });
          });

          observer.observe(targetElement, {
            childList: true,
            subtree: true,
          });

          // Clean up observer after 5 seconds
          setTimeout(() => {
            observer.disconnect();
          }, 5000);
        }
      }
    }

    // Cleanup function to remove selected-venue class when component unmounts
    return () => {
      const selectedVenues = document.querySelectorAll(".selected-venue");
      selectedVenues.forEach((venue) => {
        venue.classList.remove("selected-venue");
      });
    };
  }, []);
};
