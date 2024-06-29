"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
export function SignupForm(){
    const {toast} = useToast()
    const [signupForm,setSignupForm] = useState({username:"",email: "",password : "",name : ""})
    const [loading,setLoading] = useState(false)
    return (
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
            Capture & share your story. Get started now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Pedro Duarte" value={signupForm.name} onChange={(e)=>{
                setSignupForm(p=>{
                    return {
                        ...p,name : e.target.value
                    }
                })
              }} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="pedro" value={signupForm.username} onChange={(e)=>{
                setSignupForm(p=>{
                    return {
                        ...p,username : e.target.value
                    }
                })
              }} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="peduarte@gmail.com" value={signupForm.email} onChange={(e)=>{
                setSignupForm(p=>{
                    return {
                        ...p,email : e.target.value
                    }
                })
              }}  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********"  value={signupForm.password} onChange={(e)=>{
                setSignupForm(p=>{
                    return {
                        ...p,password : e.target.value
                    }
                })
              }}  />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled = {loading || (
                signupForm.username ==="" || signupForm.email ==="" || signupForm.password===""
            )}
            onClick={()=>{
                setLoading(true)
                fetch('/api/signup',{
                    method : "POST",
                    body : JSON.stringify(signupForm)
                }).then(res=>{
                  if(res.status === 201){
                    toast({
                      title : "Success",
                      description : res.statusText
                    })
                  }
                  else{
                    toast({
                      title : "Error",
                      description : res.statusText,
                      variant : "destructive"
                    })
                  }
                })
                .catch(e=>console.log(e)).finally(()=>{setLoading(false)})
            }}
            >Signup</Button>
          </CardFooter>
        </Card>
    )
}