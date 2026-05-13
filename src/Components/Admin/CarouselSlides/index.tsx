import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CarouselSlideModel } from "../../../Models/carousel-slide-model";
import carouselSlidesServices from "../../../Services/CarouselSlidesServices";
import notifyService from "../../../Services/NotifyService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../Components/ui/table";
import { Button } from "../../../Components/ui/button";
import { Checkbox } from "../../../Components/ui/checkbox";
import { Label } from "../../../Components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../Components/ui/alert-dialog";

type SlideFormValues = {
  imageURL: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  linkURL: string;
  linkText: string;
  displayOrder: number;
  isActive: boolean;
};

const defaultValues: SlideFormValues = {
  imageURL: "",
  title: "",
  subtitle: "",
  eyebrow: "",
  linkURL: "",
  linkText: "",
  displayOrder: 1,
  isActive: true,
};

export const AdminCarouselSlides = () => {
  const [slides, setSlides] = useState<CarouselSlideModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SlideFormValues>({ defaultValues });

  const loadSlides = async () => {
    setIsLoading(true);
    try {
      const result = await carouselSlidesServices.getAllSlides();
      setSlides(
        result.map((s) => new CarouselSlideModel(s)).sort((a, b) => a.displayOrder - b.displayOrder)
      );
    } catch (err) {
      notifyService.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const startEdit = (slide: CarouselSlideModel) => {
    setEditingId(slide.id);
    reset({
      imageURL: slide.imageURL,
      title: slide.title,
      subtitle: slide.subtitle,
      eyebrow: slide.eyebrow,
      linkURL: slide.linkURL,
      linkText: slide.linkText,
      displayOrder: slide.displayOrder,
      isActive: slide.isActive,
    });
  };

  const clearForm = () => {
    setEditingId(null);
    reset(defaultValues);
  };

  const submit = async (values: SlideFormValues) => {
    const slide = new CarouselSlideModel({ ...values, id: editingId ?? 0 });
    try {
      if (editingId !== null) {
        await carouselSlidesServices.updateSlide(slide);
        notifyService.success("Slide updated");
      } else {
        await carouselSlidesServices.addSlide(slide);
        notifyService.success("Slide added");
      }
      clearForm();
      await loadSlides();
    } catch (err) {
      notifyService.error(err);
    }
  };

  const deleteSlide = async (slide: CarouselSlideModel) => {
    try {
      await carouselSlidesServices.deleteSlide(slide.id);
      notifyService.success("Slide deleted");
      if (editingId === slide.id) clearForm();
      await loadSlides();
    } catch (err) {
      notifyService.error(err);
    }
  };

  const columns: ColumnDef<CarouselSlideModel>[] = [
    {
      accessorKey: "displayOrder",
      header: "#",
      cell: ({ row }) => row.original.displayOrder,
    },
    {
      accessorKey: "imageURL",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.imageURL}
          alt={row.original.title || "slide"}
          className="h-10 w-16 object-cover"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium text-stone-800 dark:text-gray-200">
          {row.original.title || <span className="italic text-stone-400">—</span>}
        </span>
      ),
    },
    {
      accessorKey: "eyebrow",
      header: "Eyebrow",
      cell: ({ row }) => row.original.eyebrow || <span className="italic text-stone-400">—</span>,
    },
    {
      accessorKey: "linkURL",
      header: "Link",
      cell: ({ row }) =>
        row.original.linkURL ? (
          <span className="truncate text-xs text-stone-500 dark:text-gray-400">{row.original.linkURL}</span>
        ) : (
          <span className="italic text-stone-400">—</span>
        ),
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <span
          className={
            row.original.isActive
              ? "text-xs font-semibold uppercase tracking-widest text-emerald-600"
              : "text-xs font-semibold uppercase tracking-widest text-stone-400"
          }
        >
          {row.original.isActive ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => startEdit(row.original)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-600 transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
            aria-label="Edit slide"
          >
            <FiEdit2 size={13} />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-300/60 bg-white/90 text-red-500 transition-colors hover:bg-red-50 dark:border-red-400/30 dark:bg-white/5 dark:text-red-400"
                aria-label="Delete slide"
              >
                <FiTrash2 size={13} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this slide?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the slide from the home carousel.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => deleteSlide(row.original)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: slides,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="store-shell py-10 md:py-14">
      <div className="mb-8 border-b border-stone-300/70 pb-8 dark:border-ps-border">
        <span className="section-kicker">Admin</span>
        <h1 className="font-display mt-3 mb-4 text-4xl leading-none text-stone-950 dark:text-gray-100 md:text-5xl">
          Home Carousel
        </h1>
        <p className="m-0 max-w-2xl text-sm leading-7 text-stone-600 dark:text-gray-400">
          Manage the slides shown on the home page carousel.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="form-panel space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="section-kicker">{editingId !== null ? "Update" : "New"}</span>
              <h2 className="font-display mt-2 text-2xl text-stone-950 dark:text-gray-100">
                Carousel Slide
              </h2>
            </div>
            {editingId !== null && (
              <Button type="button" variant="outline" className="rounded-none" onClick={clearForm}>
                New
              </Button>
            )}
          </div>

          <label className="form-field">
            <span className="form-label">Image URL *</span>
            <input
              className="form-input"
              type="url"
              placeholder="https://..."
              {...register("imageURL", { required: "Image URL is required" })}
            />
            {errors.imageURL && <span className="form-error">{errors.imageURL.message}</span>}
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="form-field">
              <span className="form-label">Eyebrow</span>
              <input className="form-input" type="text" placeholder="Just Arrived" {...register("eyebrow")} />
            </label>
            <label className="form-field">
              <span className="form-label">Display Order *</span>
              <input
                className="form-input"
                type="number"
                {...register("displayOrder", { valueAsNumber: true, required: "Required" })}
              />
              {errors.displayOrder && <span className="form-error">{errors.displayOrder.message}</span>}
            </label>
          </div>

          <label className="form-field">
            <span className="form-label">Title</span>
            <input className="form-input" type="text" {...register("title")} />
          </label>

          <label className="form-field">
            <span className="form-label">Subtitle</span>
            <textarea className="form-input min-h-[90px] resize-y" {...register("subtitle")} />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="form-field">
              <span className="form-label">Link URL</span>
              <input className="form-input" type="text" placeholder="/phones/123" {...register("linkURL")} />
            </label>
            <label className="form-field">
              <span className="form-label">Link Text</span>
              <input className="form-input" type="text" placeholder="Shop Now" {...register("linkText")} />
            </label>
          </div>

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
                <Label htmlFor="isActive" className="form-label">
                  Active
                </Label>
              </div>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="rounded-none">
            <FiPlus size={15} />
            {editingId !== null ? "Update Slide" : "Add Slide"}
          </Button>
        </form>

        {/* Table */}
        <div className="border border-stone-200 bg-white/80 dark:border-ps-border dark:bg-ps-card">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={editingId === row.original.id ? "bg-gold/5" : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-stone-500 dark:text-gray-400"
                    >
                      No slides yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
