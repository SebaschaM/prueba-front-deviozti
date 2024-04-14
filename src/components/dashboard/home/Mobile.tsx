import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataHomePageI, Optimized } from "../../../interfaces/dataHome";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useHome } from "../../../hooks";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const Mobile = ({ dataPage, toast }: Props) => {
  const { handleUpdateOptimized } = useHome();
  const [dataOptimized, setDataOptimized] = useState<Optimized>();
  const { register, handleSubmit, setValue } = useForm<Optimized | any>();
  const [isLoadingOptimized, setIsLoadingOptimized] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([]);

  const handleFileChangeMobile = (event: any, index: number) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result;
          return newPreviews;
        });

        const fieldNames = [
          `optimized.img`,
          `optimized.icon_1`,
          `optimized.icon_2`,
        ];
        setValue(fieldNames[index] as any, file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Optimized | any) => {
    setIsLoadingOptimized(true);
    const formData = new FormData();

    const fields = [
      "img",
      "icon_1",
      "icon_2",
      "title_main",
      "title_1",
      "title_2",
      "text_1",
      "text_2",
    ];

    fields.forEach((field) => {
      const value = data.optimized[field];

      if (value.length === 0) {
        data.optimized[field] = (dataOptimized as any)?.[field];
      }

      formData.append(field, data.optimized[field]);
    });

    try {
      formData.append(`sectionName`, "optimized");
      const { response, ok } = await handleUpdateOptimized(formData);

      if (ok) {
        toast.success("Se actualizaron los datos con éxito");
        setIsLoadingOptimized(false);
        setDataOptimized(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar");
      setIsLoadingOptimized(false);
    }
  };

  useEffect(() => {
    setDataOptimized(dataPage.optimized);
  }, []);

  useEffect(() => {
    if (dataOptimized) {
      setValue("optimized", dataOptimized);
    }
  }, [dataOptimized]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Mobile Responsive</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            <table className="min-w-full overflow-hidden divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Imagen / Icono
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Título / Subtitulo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Texto
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <div className="relative flex flex-col items-center justify-center w-32">
                      <label
                        htmlFor={`dropzone-file-mobile-0`}
                        className="flex flex-col items-center justify-center w-32 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                          <AiOutlineCloudUpload size={40} />
                          <p className="mb-2 text-sm text-gray-500">
                            Subir icono
                          </p>
                        </div>
                        <input
                          id="dropzone-file-mobile-0"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChangeMobile(e, 0)}
                        />
                      </label>

                      {imagePreviews[0] ? (
                        <div className="absolute inset-0 flex items-center justify-center w-32 h-20">
                          <img
                            src={imagePreviews[0]}
                            alt="imagePreview"
                            className="w-full h-full bg-gray-300 rounded-lg object-content"
                          />
                        </div>
                      ) : (
                        <div className="absolute w-32 h-20 pointer-events-none object-content">
                          <img
                            src={dataPage.optimized.img}
                            alt="imagePreview"
                            className="w-full h-20 bg-gray-300 rounded-lg"
                            {...register("optimized.img" as any)}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <input
                      type="text"
                      placeholder="Titulo principal"
                      defaultValue={dataPage.optimized.title_main}
                      className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 md:w-full"
                      {...register(`optimized.title_main` as any)}
                    />
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <div className="relative flex flex-col items-center w-32">
                      <label
                        htmlFor={`dropzone-file-mobile-1`}
                        className="flex flex-col items-center justify-center w-32 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                          <AiOutlineCloudUpload size={40} />
                          <p className="mb-2 text-sm text-gray-500">
                            Subir icono / imagen
                          </p>
                        </div>
                        <input
                          id={`dropzone-file-mobile-1`}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChangeMobile(e, 1)}
                        />
                      </label>

                      {imagePreviews[1] ? (
                        <div className="absolute inset-0 flex items-center justify-center w-32 h-20">
                          <img
                            src={imagePreviews[1]}
                            alt="imagePreview"
                            className="w-full h-full bg-gray-300 rounded-lg object-content"
                          />
                        </div>
                      ) : (
                        <div className="absolute w-32 h-20 pointer-events-none object-content">
                          <img
                            src={dataPage.optimized.icon_1}
                            alt="imagePreview"
                            className="w-full h-20 bg-gray-300 rounded-lg"
                            {...register(`optimized.icon_1` as any)}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <input
                      type="text"
                      placeholder="Nombre proyecto"
                      defaultValue={dataPage.optimized.title_1}
                      className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 md:w-full"
                      {...register(`optimized.title_1` as any)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <textarea
                      rows={4}
                      placeholder="Texto proyecto"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 md:w-full"
                      defaultValue={dataPage.optimized.text_1}
                      {...register(`optimized.text_1` as any)}
                    ></textarea>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <div className="relative flex flex-col items-center w-32">
                      <label
                        htmlFor={`dropzone-file-mobile-2`}
                        className="flex flex-col items-center justify-center w-32 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center h-20 pt-5 pb-6">
                          <AiOutlineCloudUpload size={40} />
                          <p className="mb-2 text-sm text-gray-500">
                            Subir icono
                          </p>
                        </div>
                        <input
                          id={`dropzone-file-mobile-2`}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChangeMobile(e, 2)}
                        />
                      </label>

                      {imagePreviews[2] ? (
                        <div className="absolute inset-0 flex items-center justify-center w-32 h-20">
                          <img
                            src={imagePreviews[2]}
                            alt="imagePreview"
                            className="w-full h-full bg-gray-300 rounded-lg object-content"
                          />
                        </div>
                      ) : (
                        <div className="absolute w-32 h-20 pointer-events-none object-content">
                          <img
                            src={dataPage.optimized.icon_2}
                            alt="imagePreview"
                            className="w-full h-20 bg-gray-300 rounded-lg"
                            {...register(`optimized.icon_2` as any)}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <input
                      type="text"
                      placeholder="Nombre proyecto"
                      defaultValue={dataPage.optimized.title_2}
                      className="bg-gray-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 md:w-full"
                      {...register(`optimized.title_2` as any)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-32!">
                    <textarea
                      rows={4}
                      placeholder="Texto proyecto"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 md:w-full"
                      defaultValue={dataPage.optimized.text_2}
                      {...register(`optimized.text_2` as any)}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 w-fit"
            type="submit"
            disabled={isLoadingOptimized}
          >
            {isLoadingOptimized ? (
              <l-ring size="19" speed="2" color="white" stroke={4}></l-ring>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mobile;
