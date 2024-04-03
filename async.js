const fetchProduct = async () => {
  const res = await fetch("http://localhost:3000/product"); // 3s
  const data = await res.json(); // 2s
};

// ! tong = 5s

Promise.all;
