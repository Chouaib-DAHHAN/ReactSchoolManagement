
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../ui/tabs.jsx";
import {Separator} from "../../ui/separator.jsx";
import {ScrollArea, ScrollBar} from "../../ui/scroll-area.jsx";
import AdminParentsList from "../../data-table/parent/AdminParentsList.jsx";
import ParentApi from "../../../services/api/ParentApi.jsx";
import ParentCreateEditForm from "../../Forms/ParentCreateEditForm.jsx";
import StudentsList from "../../data-table/student/StudentsList.jsx";

export default function ManageStudents(){


  return <>
    <div>
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-3 lg:col-span-4">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="students_list" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="students_list" className="relative">
                          Students
                        </TabsTrigger>
                        <TabsTrigger value="add_student">Add new student</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="students_list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1 w-full">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            All Students
                          </h2>
                          {<StudentsList/> }
                        </div>
                      </div>
                      <Separator className="my-4"/>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="add_student">
                      <div className="space-y-1">
                         <ParentCreateEditForm handleSubmit = {(values) => 
                          ParentApi.create(values)
                         }/> 
                      </div>
                      <Separator className="my-4"/>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}