import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataHomePageI, Projects } from "../../../interfaces/dataHome";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useHome } from "../../../hooks";

import ResponsivePagination from "react-responsive-pagination";

interface Props {
  dataPage: DataHomePageI;
  toast: any;
}

const Projectss = ({ dataPage, toast }: Props) => {
  const { handleUpdateProjects } = useHome();
  const [selectedProjectType, setSelectedProjectType] =
    useState<any>("default");
  const [dataProjects, setDataProjects] = useState<Projects[]>([]);
  const { register, handleSubmit, setValue, reset } = useForm<
    Projects[] | any
  >();
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState("");
  const [inputNewProject, setInputNewProject] = useState<Projects>({
    name_project: "",
    list_projects: [
      {
        cover: "",
        link: "",
        name: "",
      },
    ],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = dataProjects.find(
    (_project, index) => index == selectedProjectType
  );

  const totalItems = filteredProjects
    ? filteredProjects.list_projects.length
    : 0;
  const totalPages = Math.ceil(totalItems / 5);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = filteredProjects
    ? filteredProjects.list_projects.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handleProjectTypeChange = (value: any) => {
    setSelectedProjectType(value);
  };

  const handleFileChangeCharacter = (
    event: any,
    index: number,
    index2: number
  ) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = newPreviews[index] || [];
          newPreviews[index][index2] = reader.result;
          return newPreviews;
        });

        const updateInput = (input: any, property: any, value: any) => {
          return {
            ...input,
            [property]: input[property].map((item: any, i: number) =>
              i === index2 ? { ...item, [property]: value } : item
            ),
          };
        };

        if (index === dataProjects.length) {
          setInputNewProject((prevInput) =>
            updateInput(prevInput, "list_projects", {
              cover: file,
            })
          );
          setImageSrc(reader.result as any);
        } else {
          setValue(
            `projects[${index}].list_projects[${index2}].cover` as any,
            file
          );
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoadingProjects(true);

    const formData = new FormData();
    let dataFinal = [];

    if (data.projects && data.projects.length > 0) {
      dataFinal = data.projects.map((project: any, index: number) => {
        const dataFinalR = project.list_projects.map(
          (listProject: any, index2: number) => {
            return {
              ...listProject,
              cover:
                listProject.cover ||
                (dataProjects && dataProjects[index]
                  ? dataProjects[index].list_projects[index2]?.cover
                  : ""),
            };
          }
        );

        return {
          ...project,
          list_projects: dataFinalR.filter(
            (subProject: any) => subProject.name !== ""
          ),
        };
      });
    } else {
      dataFinal = dataProjects;
    }

    if (inputNewProject.name_project !== "") {
      const newProject = {
        name_project: inputNewProject.name_project,
        list_projects: [
          {
            name:
              selectedProjectType == "new"
                ? "default"
                : inputNewProject.list_projects[0].name,
            link:
              selectedProjectType == "new"
                ? "default"
                : inputNewProject.list_projects[0].link,
            cover:
              selectedProjectType == "new"
                ? "default"
                : inputNewProject.list_projects[0].cover,
          },
        ],
      };

      dataFinal.push(newProject);
    }

    dataFinal.forEach((project: any, index: any) => {
      formData.append(`projects[${index}][name_project]`, project.name_project);

      project.list_projects.forEach((subProject: any, indexP: any) => {
        formData.append(
          `projects[${index}][list_projects][${indexP}][name]`,
          subProject.name
        );
        formData.append(
          `projects[${index}][list_projects][${indexP}][link]`,
          subProject.link
        );

        if (subProject.cover instanceof File) {
          formData.append(`projectCover_${indexP}`, subProject.cover);
        } else if (typeof subProject.cover === "string") {
          formData.append(
            `projects[${index}][list_projects][${indexP}][cover]`,
            subProject.cover
          );
        }
      });
    });

    try {
      formData.append(`sectionName`, "projects");
      const { response, ok } = await handleUpdateProjects(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setInputNewProject({
          name_project: "",
          list_projects: [
            {
              cover: "",
              link: "",
              name: "",
            },
          ],
        });
        setIsLoadingProjects(false);
        setImagePreviews([]);
        reset();
        setInputNewProject({
          ...inputNewProject,
          name_project: "",
        });
        setDataProjects(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingProjects(false);
    }
  };

  const onDeleteTechnicalSkill = async (id: any) => {
    try {
      const dataFilter = dataProjects
        .map((project) => {
          project.list_projects = project.list_projects.filter(
            (listProject) => listProject._id !== id
          );
          return project;
        })
        .filter((project) => {
          if (project.list_projects.length === 0) {
            setSelectedProjectType("default" as any);
          }
          return project.list_projects.length > 0;
        });
      setDataProjects(dataFilter);
      await onSubmit({ projects: dataFilter });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataProjects(dataPage.projects);
  }, []);

  useEffect(() => {
    if (dataProjects) {
      setValue("projects", dataProjects);
    }
  }, [dataProjects]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Proyectos</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              onChange={(e) => handleProjectTypeChange(e.target.value)}
              value={selectedProjectType!}
            >
              <option value={"default"} disabled>
                Seleccione un tipo de proyecto
              </option>
              {dataProjects.map((project, index) => (
                <option
                  key={index}
                  value={index}
                  onClick={() => handleProjectTypeChange(index + 1)}
                >
                  {project.name_project}
                </option>
              ))}
              <option value="new" className="bg-gray-300">
                Nuevo tipo de proyecto
              </option>
            </select>
          </div>

          {selectedProjectType !== null && (
            <div className="flex flex-col gap-4">
              <table className="min-w-full overflow-hidden divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {selectedProjectType === "new" && (
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                      >
                        Tipo de proyecto
                      </th>
                    </tr>
                  )}
                  {selectedProjectType !== "new" &&
                    selectedProjectType !== "default" && (
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                        >
                          Portada
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                        >
                          Proyecto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                        >
                          Enlace del proyecto
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                        >
                          Acciones
                        </th>
                      </tr>
                    )}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedProjectType === "new" ? (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <input
                            type="text"
                            placeholder="Tipo de  proyecto"
                            value={inputNewProject.name_project}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) =>
                              setInputNewProject({
                                ...inputNewProject,
                                name_project: e.target.value,
                                list_projects: [
                                  {
                                    ...inputNewProject.list_projects[0],
                                  },
                                ],
                              })
                            }
                          />

                          <div className="flex flex-col gap-4">
                            <h3 className="mt-4 text-xl text-gray-900">
                              Tipos de proyectos actuales
                            </h3>
                            <div className="flex flex-col overflow-hidden overflow-y-auto max-h-56 gap-y-2">
                              {dataProjects.map((project, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between gap-4 p-2.5 border border-gray-300 rounded-lg"
                                >
                                  <p>{project.name_project}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((project_u, index2) => {
                      const realIndex = indexOfFirstItem + index2;
                      return (
                        <tr key={realIndex}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Imagen */}
                            <div className="relative flex items-center justify-center overflow-hidden h-fit w-[12rem]">
                              <label
                                htmlFor={`dropzone-file-project-${selectedProjectType}-${realIndex}`}
                                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 h-36">
                                  <AiOutlineCloudUpload size={40} />
                                  <p className="mb-2 text-sm text-gray-500">
                                    Subir icono
                                  </p>
                                </div>
                                <input
                                  id={`dropzone-file-project-${selectedProjectType}-${realIndex}`}
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileChangeCharacter(
                                      e,
                                      selectedProjectType,
                                      realIndex
                                    )
                                  }
                                />
                              </label>

                              {imagePreviews[selectedProjectType] &&
                              imagePreviews[selectedProjectType][realIndex] ? (
                                <div className="absolute object-cover pointer-events-none w-[9rem] h-[6rem]">
                                  <img
                                    src={
                                      imagePreviews[selectedProjectType][
                                        realIndex
                                      ]
                                    }
                                    alt="imagePreview"
                                    className="w-[9rem] h-[6rem] bg-white"
                                  />
                                </div>
                              ) : (
                                <div className="absolute object-cover pointer-events-none w-[9rem] h-[6rem]">
                                  <img
                                    src={project_u.cover}
                                    alt="imagePreview"
                                    className="w-[9rem] h-[6rem] bg-white"
                                  />
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Nombre del proyecto */}
                            <div>
                              <input
                                type="text"
                                placeholder="Nombre proyecto"
                                defaultValue={project_u.name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                {...register(
                                  `projects[${selectedProjectType}].list_projects[${realIndex}].name` as any
                                )}
                              />
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Enlace del proyecto */}
                            <div>
                              <input
                                type="text"
                                placeholder="Enlace proyecto"
                                defaultValue={project_u.link}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                {...register(
                                  `projects[${selectedProjectType}].list_projects[${realIndex}].link` as any
                                )}
                              />
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* Acción de eliminar */}
                            <div className="flex justify-center gap-4">
                              <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() =>
                                  onDeleteTechnicalSkill(project_u._id)
                                }
                              >
                                <BsTrash
                                  size={20}
                                  className="transition-all duration-300 hover:text-red-500"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />

              {selectedProjectType !== "new" &&
                selectedProjectType !== "default" && (
                  <div className="flex flex-col mb-4 transition-all duration-300 w-fit gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit">
                    <div className="flex gap-x-4">
                      <div className="relative flex items-center justify-center overflow-hidden h-fit w-[10rem]">
                        <label
                          htmlFor={`dropzone-file-project-${selectedProjectType}`}
                          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 "
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 h-36">
                            <AiOutlineCloudUpload size={40} />
                            <p className="mb-2 text-sm text-gray-500">
                              Subir icono
                            </p>
                          </div>
                          <input
                            id={`dropzone-file-project-${selectedProjectType}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChangeCharacter(
                                e,
                                selectedProjectType,
                                dataProjects[selectedProjectType].list_projects
                                  .length
                              )
                            }
                          />
                        </label>

                        {imagePreviews[selectedProjectType] &&
                          imagePreviews[selectedProjectType][
                            dataProjects[selectedProjectType].list_projects
                              .length
                          ] && (
                            <div className="absolute object-cover pointer-events-none w-max-60 h-max-60 ">
                              <img
                                src={
                                  imagePreviews[selectedProjectType][
                                    dataProjects[selectedProjectType]
                                      .list_projects.length
                                  ]
                                }
                                alt="imagePreview"
                                className="w-full h-full bg-white"
                              />
                            </div>
                          )}
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre proyecto"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register(
                              `projects[${selectedProjectType}].list_projects[${dataProjects[selectedProjectType].list_projects.length}].name` as any
                            )}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Enlace proyecto"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register(
                              `projects[${selectedProjectType}].list_projects[${dataProjects[selectedProjectType].list_projects.length}].link` as any
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 w-fit"
            type="submit"
            disabled={isLoadingProjects}
          >
            {isLoadingProjects ? (
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

export default Projectss;
