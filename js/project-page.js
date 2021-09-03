window.onload = (event) => {
    console.log('page is fully loaded');
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("preload")
  };