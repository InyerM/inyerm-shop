import { FC, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import DriveFileRenameOutline from "@mui/icons-material/DriveFileRenameOutline"
import SaveOutlined from "@mui/icons-material/SaveOutlined"
import UploadOutlined from "@mui/icons-material/UploadOutlined"
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { useSnackbar } from "notistack"

import { AdminLayout } from "../../../components/layout"
import { IProduct, ISize, IType } from "../../../interfaces"
import { dbProducts } from "../../../database"
import { snackbarConfig } from "./../../../config"
import { shopApi } from "../../../api"
import { Product } from "../../../models"

const validTypes = ["shirts", "pants", "hoodies", "hats"]
const validGender = ["men", "women", "kid", "unisex"]
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

type Gender = "men" | "women" | "kid" | "unisex"

interface FormData {
  _id?: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ISize[]
  slug: string
  tags: string[]
  title: string
  type: IType
  gender: Gender
}

interface Props {
  product: IProduct
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [newTagValue, setNewTagValue] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      ...product,
      tags: product.tags || [],
    },
  })
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        const newSlug =
          value.title?.trim().replaceAll(" ", "_").replaceAll("'", "").toLowerCase() || ""
        setValue("slug", newSlug, {
          shouldValidate: true,
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, setValue])

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues("tags").filter((t) => t !== tag)
    setValue("tags", updatedTags, {
      shouldValidate: true,
    })
  }

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase()
    setNewTagValue(newTag)
    const currentTags = getValues("tags")

    if (currentTags?.includes(newTag)) return
    currentTags?.push(newTag)
    setNewTagValue("")
  }

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues("sizes")
    if (currentSizes.includes(size))
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        {
          shouldValidate: true,
        },
      )

    setValue("sizes", [...currentSizes, size], {
      shouldValidate: true,
    })
  }

  const onFilesSelected = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return

    try {
      for (const file of target.files) {
        const formData = new FormData()
        formData.append("file", file)
        const { data } = await shopApi.post<{ message: string }>("/admin/upload", formData)
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        })
      }

      enqueueSnackbar("Images uploaded successfully", {
        variant: "success",
        ...snackbarConfig,
      })
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
        ...snackbarConfig,
      })
    }
  }

  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((i) => i !== image),
      {
        shouldValidate: true,
      },
    )
  }

  const onSubmit = async (formData: FormData) => {
    if (formData.images.length < 2)
      return enqueueSnackbar("Please upload at least 2 images", {
        variant: "error",
        ...snackbarConfig,
      })
    setIsSaving(true)
    try {
      const { data } = await shopApi<IProduct>({
        url: "/admin/products",
        method: formData._id ? "PUT" : "POST",
        data: formData,
      })
      if (!formData._id) {
        router.replace(`/admin/products/${data.slug}`)
      }
      setIsSaving(false)
      enqueueSnackbar("Product saved successfully", {
        variant: "success",
        ...snackbarConfig,
      })
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
        ...snackbarConfig,
      })
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Product"
      subtitle={`Editing: ${product.title}`}
      icon={<DriveFileRenameOutline />}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}>
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "This field is required",
                minLength: { value: 2, message: "At least 2 characters" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("description", {
                required: "This field is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventory"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "This field is required",
                min: { value: 0, message: "Must be greater than 0" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "This field is required",
                min: { value: 0, message: "Must be greater than 0" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues("type")}
                onChange={({ target }) =>
                  setValue("type", target.value as IType, {
                    shouldValidate: true,
                  })
                }>
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues("gender")}
                onChange={({ target }) =>
                  setValue("gender", target.value as Gender, {
                    shouldValidate: true,
                  })
                }>
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues("sizes").includes(size as ISize)} />}
                  label={size}
                  onChange={() => onChangeSize(size as ISize)}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "This field is required",
                validate: (value) => (value.trim().includes(" ") ? "No spaces" : undefined),
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={({ code }) => (code === "Space" ? onNewTag() : undefined)}
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
              component="ul">
              {getValues("tags")?.map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                )
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}>
                Load image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                onChange={onFilesSelected}
              />

              <Chip
                label="Yo may upload at least 2 images"
                color="error"
                variant="outlined"
                sx={{ display: getValues("images").length < 2 ? "flex" : "none" }}
              />

              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component="img" className="fadeIn" image={img} alt={img} />
                      <CardActions>
                        <Button fullWidth color="error" onClick={() => onDeleteImage(img)}>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query

  let product: IProduct | null

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()))
    delete tempProduct._id
    tempProduct.images = ["img1.jpg", "img2.jpg"]
    product = tempProduct
  } else {
    product = await dbProducts.getProductBySlug(slug.toString())
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
  }
}

export default ProductAdminPage
