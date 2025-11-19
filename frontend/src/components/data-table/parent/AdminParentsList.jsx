import { useEffect , useState} from "react";
import { DataTable } from "../DataTable";
import { parents } from '/src/components/data-table/parent/AdminParentsColumn.jsx';
import ParentApi from "../../../services/api/ParentApi";

export default function AdminParentsList(){

    const [data , setData] = useState([])

useEffect(() => {
  ParentApi.all().then(({data}) => setData(data.data))
  
},[])

    return (
        <>
        <DataTable columns={parents} data={data}></DataTable>
        </>
    )
}