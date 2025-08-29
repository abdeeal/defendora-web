let navModal = false;
const navProfileModal = document.querySelector("#nav-profile-modal");
const navProfileWrapper = document.querySelector("#nav-profile-wrapper");

function toggleModal(){
  if(!navModal) {
    navProfileModal.style.display = "flex"
    document.body.style.overflow = "hidden"

    navProfileWrapper.style.height = "0px"
    gsap.to(navProfileWrapper, {
      height: "459px",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        navProfileWrapper.style.height = "459px"
      }
    })

    navModal = true
  }else {
    gsap.to(navProfileWrapper, {
      height: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        navProfileModal.style.display = "none"
      }
    })
    navModal = false;
  }
}

navProfileModal.addEventListener("click", (e) => {
  if(navModal && !navProfileWrapper.contains(e.target)) {
    toggleModal();
  }
})