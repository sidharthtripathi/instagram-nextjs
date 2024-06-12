"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LoginForm(){
    const [loginForm,setLoginForm] = useState({identifier : "",password : ""})
    const [loading,setLoading] = useState(false)
    return (
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
            Welcome back! Sign in to connect
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email or Username</Label>
              <Input id="email" type="email" placeholder="peduarte@gmail.com" value={loginForm.identifier} onChange={(e)=>{
                setLoginForm(p=>{
                    return {
                        ...p,identifier : e.target.value
                    }
                })
              }} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" value={loginForm.password} onChange={(e)=>{
                setLoginForm(p=>{
                    return {
                        ...p,password : e.target.value
                    }
                })
              }}  />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={()=>{
                setLoading(true)
                fetch('/api/login',{
                    method : "POST",
                    body : JSON.stringify(loginForm)
                }).catch(err=>{console.log(err)})
                .finally(()=>{setLoading(false)})
            }} disabled = {loading || (loginForm.identifier==="" || loginForm.password === "")}>Login</Button>
          </CardFooter>
        </Card>
    )
}