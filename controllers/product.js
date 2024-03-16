export const getProducts = async (req, res) => {
  try {
    const { data } = await instance.get("/products");
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co san pham nao!" });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { data } = await instance.post("/products", req.body);
    if (!data) {
      return res.status(400).json({ message: "Them san pham that bai!" });
    }
    return res.status(201).json({
      message: "Them san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { data } = await instance.get(`/products/${req.params.id}`);
    if (!data) {
      return res.status(400).json({ message: "Lay san pham that bai!" });
    }
    return res.status(201).json({
      message: "Lay san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { data } = await instance.put(`/products/${req.params.id}`, req.body);
    if (!data) {
      return res.status(400).json({ message: "Cap nhat san pham that bai!" });
    }
    return res.status(201).json({
      message: "Cap nhat san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const removeProductById = async (req, res) => {
  try {
    const { status } = await instance.delete(`/products/${req.params.id}`);
    console.log(status);
    if (status != 200) {
      return res.status(400).json({ message: "Xoa san pham that bai!" });
    }
    return res.status(200).json({
      message: "Xoa san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
