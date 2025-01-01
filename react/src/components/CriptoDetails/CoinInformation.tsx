import { FaGlobe, FaTwitter, FaGithub } from "react-icons/fa"; // Importar íconos desde react-icons

export default function CoinInformation({ data }: { data: any }) {
    return (
        <table className="text-xs w-full">
            <tbody>
                {data.urls.website.length > 0 && 
                    <tr>
                        <td className="font-medium py-2 whitespace-nowrap">Web</td>
                        <td className="text-right">
                            <a
                                href={data.urls.website[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 bg-secondary rounded-full px-4 py-1 text-blue-400 hover:text-blue-500 inline-flex items-center gap-2"
                            >
                                <FaGlobe /> Sitio web
                            </a>
                        </td>
                    </tr>
                }
                
                {data.urls.twitter.length > 0 && 
                    <tr>
                        <td className="font-medium py-2 whitespace-nowrap">Twitter</td>
                        <td className="text-right">
                            <a
                                href={data.urls.twitter[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 bg-secondary rounded-full px-4 py-1 text-blue-400 hover:text-blue-500 inline-flex items-center gap-2"
                            >
                                <FaTwitter /> Twitter
                            </a>
                        </td>
                    </tr>
                }

                {data.urls.source_code.length > 0 && 
                    <tr>
                        <td className="font-medium py-2 whitespace-nowrap">Código fuente</td>
                        <td className="text-right">
                            <a
                                href={data.urls.source_code[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-200 bg-secondary rounded-full px-4 py-1 text-blue-400 hover:text-blue-500 inline-flex items-center gap-2"
                            >
                                <FaGithub /> Github
                            </a>
                        </td>
                    </tr>
                }

                {data.date_added && 
                    <tr>
                        <td className="font-medium py-2 whitespace-nowrap">Añadido</td>
                        <td className="text-right">
                            {new Date(data.date_added).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
}
