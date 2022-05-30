import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useAdmin } from "../../context/AdminPageContext";
import { ProductData } from "../../ProductData";
import { toast } from "react-toastify";

export interface ProductValues {
  title: string;
  description: string;
  price: number | string;
  stock: number | string;
  category: string[];
}

interface editProduct {
  product: ProductData;
}

function EditProductForm(props: editProduct) {
  console.log(props.product.category);
  const InitialValue: ProductValues = {
    title: props.product.title,
    description: props.product.description,
    price: props.product.price,
    stock: props.product.stock,
    category: props.product.category,
  };
  const ProductValidationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
    stock: yup.number().required("Stock is required"),
  });
  const { saveProduct } = useAdmin();
  const [categories, setCategories] = useState<string[]>(
    props.product.category
  );
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState<string>(props.product.imageId!);

  const handleImageChange = async (event: any) => {
    // console.log(event.currentTarget.files[0]);
    console.log(event);
    let data = new FormData();
    data.append("media", event.target.files[0]);

    // data.append("file", event.target);
    // data.append("file", event.target.files[0]);
    let response = await fetch("/api/media", {
      method: "POST",
      body: data,
    });
    let jsonres = await response.json();
    setImage(jsonres.filename);
    setImageId(jsonres._id);
  };

  // Updates the state of the checkboxes
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      let newList = categories;
      newList.push(event.target.value);
      setCategories(newList);
    } else {
      let newList = categories.filter(
        (category) => category !== event.target.value
      );
      setCategories(newList);
      // console.log(newList);
    }
  };

  const validateAndSaveNewProduct = (values: ProductValues) => {
    values.category = categories;
    console.log(imageId);
    if (
      imageId &&
      values.title &&
      values.description &&
      values.price &&
      values.stock &&
      props.product.category.length > 0
    ) {
      const newProduct: ProductData = {
        imageId,
        title: values.title,
        description: values.description,
        price: values.price as number,
        stock: values.stock as number,
        category: values.category,
      };
      console.log(newProduct);
      saveProduct(newProduct, props.product._id!);
    } else {
      toast.error("Make sure a category is choosen and an image is uploaded");
    }
  };

  const { values, errors, touched, handleSubmit, handleChange } =
    useFormik<ProductValues>({
      initialValues: InitialValue,
      validationSchema: ProductValidationSchema,
      onSubmit: validateAndSaveNewProduct,
    });

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        encType={"multipart/form-data"}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "3rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              required
              type="text"
              name="title"
              label="Title"
              margin="normal"
              value={values.title}
              onChange={handleChange}
              error={touched.title && Boolean(errors.title)}
            />
            <TextField
              required
              type="number"
              name="price"
              label="Price"
              value={values.price}
              onChange={handleChange}
              error={touched.price && Boolean(errors.price)}
              margin="normal"
            />
            <TextField
              required
              type="number"
              name="stock"
              label="Stock"
              value={values.stock}
              onChange={handleChange}
              error={touched.stock && Boolean(errors.stock)}
              margin="normal"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              required
              type="text"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              margin="normal"
              multiline={true}
              minRows="2"
            />

            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                name="media"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e)}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            {image}
            <label></label>
            <FormLabel component="legend">Categories</FormLabel>
            <FormGroup>
              <FormControlLabel
                name="furniture"
                onChange={(e: any) => handleCategoryChange(e)}
                value="furniture"
                control={
                  <Checkbox
                    defaultChecked={values.category.includes("furniture")}
                  />
                }
                label="Furniture"
              />
              <FormControlLabel
                name="chairs"
                onChange={(e: any) => handleCategoryChange(e)}
                value="chairs"
                control={
                  <Checkbox
                    defaultChecked={values.category.includes("chairs")}
                  />
                }
                label="Chairs"
              />
              <FormControlLabel
                name="decorations"
                onChange={(e: any) => handleCategoryChange(e)}
                value="decorations"
                control={
                  <Checkbox
                    defaultChecked={values.category.includes("decorations")}
                  />
                }
                label="Decorations"
              />
              <FormControlLabel
                name="beds"
                onChange={(e: any) => handleCategoryChange(e)}
                value="beds"
                control={
                  <Checkbox defaultChecked={values.category.includes("beds")} />
                }
                label="Beds"
                defaultChecked
              />
              <FormControlLabel
                name="tables"
                onChange={(e: any) => handleCategoryChange(e)}
                value="tables"
                control={
                  <Checkbox
                    defaultChecked={values.category.includes("tables")}
                  />
                }
                label="Tables"
              />
            </FormGroup>
          </div>
        </div>
        <Button
          size="large"
          variant="contained"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "200px",
            backgroundColor: "#CAC2B9",
            color: "white",
            letterSpacing: "3px",
            margin: "2rem 0",
          }}
          type="submit"
        >
          UPDATE PRODUCT
        </Button>
      </form>
    </Container>
  );
}

export default EditProductForm;
