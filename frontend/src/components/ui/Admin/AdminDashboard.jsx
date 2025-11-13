import { useContext} from "react";
import { UserStateContext } from "@/context/UserContext";

export default function AdminDashboard() {

      const { user } = useContext(UserStateContext)

  return (
    

    <>
     <div className="overflow-x-auto">
                    
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                  ID
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                   Name  
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                   Email
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                    date de creation
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-600">
                                {user.firstname}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                    {user.lastname}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                     {user.email}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-600">
                                    {user.created_at}
                                </td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
      
    </>

  )
   
}

