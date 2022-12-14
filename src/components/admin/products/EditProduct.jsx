import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../adminCSS/AdminCSS.module.css";
import UploadingModal from "./UploadingModal";

function EditProduct() {
  const user = useSelector((state) => state.user);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [slug, setSlug] = useState("");
  const [actionImages, setActionImages] = useState("add");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products/${params.slug}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      setId(response.data._id);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setStock(response.data.stock);
      setCategory(response.data.category);
      setSlug(response.data.slug);
    };
    getProduct();
  }, []); // eslint-disable-line

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/categories`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      setCategories(response.data);
    };
    getCategories();
  }, []); // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !stock // || !slug
    ) {
      setError(true);
      return false;
    }

    console.log("handleSubmit");
    handleShow();
    const formData = new FormData(e.target);
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/products/${id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user.token,
      },
      data: formData,
    });
    if (response.data.msg === "OK") {
      handleClose();
      navigate("/admin/products");
    } else {
      handleClose();
      return setMessage(response.data.msg);
    }
  };
  // <Modal show={show} onHide={handleClose}></Modal>
  return (
    category && (
      <div className={`${styles.body} position-relative`}>
        <UploadingModal show={show} onHide={handleClose} />
        <form
          className={styles.form}
          encType="multipart/form-data"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className={styles.message}>Required field</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {error && !description && <span className={styles.message}>Required field</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className={styles.message}>Required field</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            {error && !stock && <span className={styles.message}>Required field</span>}
          </div>
          <div className="mb-3">
            <label className="form-label">Slug</label>
            <input
              type="text"
              className="form-control"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            {error && !slug && <span className={styles.message}>Required field</span>}
          </div>
          <label className="form-label">Categories</label>
          <select
            className="form-select mb-3"
            name="category"
            value={category.name}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={category._id}>{category.name}</option>
            {categories
              .filter((cat) => cat.name !== category)
              .map((category, index) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
          <label className="form-label">Do you want to add or replace the images?</label>
          <select
            className="form-select mb-3"
            name="actionImages"
            value={actionImages}
            onChange={(e) => setActionImages(e.target.value)}
          >
            <option value="add">Add</option>
            <option value="replace">Replace</option>
          </select>

          <div className="mt-3">
            <input className="form-control" name="image1" type="file" />
          </div>
          <div className="mt-3">
            <input className="form-control" name="image2" type="file" />
          </div>
          <div className="mt-3">
            <input className="form-control" name="image3" type="file" />
          </div>
          <p className={styles.message}>{message}</p>
          <div className="d-flex flex-row-reverse">
            <button type="submit" className={styles.buttonSubmit}>
              Edit
            </button>
            <Link className={styles.linkBack} to={-1}>
              Back
            </Link>
          </div>
        </form>
      </div>
    )
  );
}

export default EditProduct;
