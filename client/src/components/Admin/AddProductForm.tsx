import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useAdmin } from "../../context/AdminPageContext";
import { generateId, ProductData } from "../../ProductData";
import NewProductConfirmation from "./NewProductConfirmation";

export interface ProductValues {
  title: string;
  description: string;
  price: number;
  image: string;
}

const InitialValue: ProductValues = {
  title: "",
  description: "",
  price: 0,
  image: "",
};

const ProductValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  image: yup.string().required(),
});

function AddProductForm() {
  const { addProduct } = useAdmin();
  const [confirmation, setConfirmation] = useState(false);

  const validateAndSaveNewProduct = (values: ProductValues) => {
    /**
     * makes new product and after 0.5 sec shows confirmation
     */
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: ProductData = {
          id: generateId(),
          title: values.title,
          description: values.description,
          price: values.price,
          image: values.image,
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
        style={{ display: "flex", flexDirection: "column", justifyContent:'center', alignItems:'center'}}
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
              type="text"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              margin="normal"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
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
              name="image"
              label="Image url"
              value={values.image}
              onChange={handleChange}
              error={touched.image && Boolean(errors.image)}
              margin="normal"
            />
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
            marginTop: '2rem'
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
