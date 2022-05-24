import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useAdmin } from "../../context/AdminPageContext";
import NewProductConfirmation from "./NewProductConfirmation";
import { ProductData } from "../../ProductData";

export interface ProductValues {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
}

const InitialValue: ProductValues = {
  title: "",
  description: "",
  price: 0,
  stock: 0,
  category: [""],
};

const ProductValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  stock: yup.number().required("Stock is required"),
});

function AddProductForm() {
  const { addProduct } = useAdmin();
  const [confirmation, setConfirmation] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [image, setImage] = useState();

  const handleImageChange = async (event: any) => {
    // console.log(event.currentTarget.files[0]);

    let data = new FormData();
    data.append("media", event.target.files[0]);
    // data.append("file", event.target);
    // data.append("file", event.target.files[0]);
    let response = await fetch("/api/media", {
      method: "POST",
      body: data,
    });
    console.log(await response.json());
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
    console.log(values.category);
    /**
     * makes new product and after 0.5 sec shows confirmation
     */
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: ProductData = {
          title: values.title,
          description: values.description,
          price: values.price,
          stock: values.stock,
          category: values.category,
        };
        addProduct(newProduct);
        resolve(newProduct);
      }, 500);
    });
    promise.then(() => {
      setConfirmation(true);
    });
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
                onChange={(e: any) => handleImageChange(e)}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <FormLabel component="legend">Categories</FormLabel>
            <FormGroup>
              <FormControlLabel
                name="furniture"
                onChange={(e: any) => handleCategoryChange(e)}
                value="furniture"
                control={<Checkbox />}
                label="Furniture"
              />
              <FormControlLabel
                name="chairs"
                onChange={(e: any) => handleCategoryChange(e)}
                value="chairs"
                control={<Checkbox />}
                label="Chairs"
              />
              <FormControlLabel
                name="decorations"
                onChange={(e: any) => handleCategoryChange(e)}
                value="decorations"
                control={<Checkbox />}
                label="Decorations"
              />
              <FormControlLabel
                name="beds"
                onChange={(e: any) => handleCategoryChange(e)}
                value="beds"
                control={<Checkbox />}
                label="Beds"
              />
              <FormControlLabel
                name="tables"
                onChange={(e: any) => handleCategoryChange(e)}
                value="tables"
                control={<Checkbox />}
                label="Tables"
              />
            </FormGroup>
          </div>
        </div>
        <Button
          onClick={NewProductConfirmation}
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
          ADD PRODUCT
        </Button>
      </form>
      {confirmation ? <NewProductConfirmation /> : undefined}
    </Container>
  );
}

export default AddProductForm;
