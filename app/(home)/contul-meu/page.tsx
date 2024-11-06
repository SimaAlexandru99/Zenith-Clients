"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Building, Mail, Phone, User } from "lucide-react"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Button } from "components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { toast } from "components/ui/use-toast"
import { auth } from "lib/firebase"

// Define the form schema with Zod
const accountFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Numele trebuie să conțină cel puțin 2 caractere" })
    .max(50, { message: "Numele nu poate depăși 50 de caractere" }),
  email: z.string().email({ message: "Adresa de email trebuie să fie validă" }),
  company: z
    .string()
    .min(2, { message: "Numele companiei trebuie să conțină cel puțin 2 caractere" })
    .max(100, { message: "Numele companiei nu poate depăși 100 de caractere" }),
  phone: z
    .string()
    .regex(/^(\+4|0)?[0-9]{9,10}$/, {
      message: "Numărul de telefon trebuie să fie un număr valid din România",
    })
    .optional()
    .or(z.literal("")),
})

// Infer TypeScript type from Zod schema
type AccountFormValues = z.infer<typeof accountFormSchema>

const AccountPage = () => {
  const [user] = useAuthState(auth)
  const [isEditing, setIsEditing] = useState(false)

  // Helper function to get initials
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "??"
    )
  }

  // Extract display name parts
  const displayName = user?.email
    ? user.email
        .split("@")[0]
        ?.split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ")
    : "User"

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      fullName: displayName,
      email: user?.email || "",
      company: "Optima Solutions Services",
      phone: "",
    },
  })

  const handleSave = async (data: AccountFormValues) => {
    try {
      // Here you would typically update the user profile in your backend
      console.log("Form data to save:", data)

      toast({
        title: "Profil actualizat",
        description: "Modificările au fost salvate cu succes.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut actualiza profilul. Încercați din nou.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Contul meu</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="size-16 rounded-lg">
                <AvatarImage src={user?.photoURL || ""} alt={displayName} />
                <AvatarFallback className="rounded-lg text-lg">{getInitials(displayName || "User")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{displayName}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Informații personale</h3>
                    <Button
                      type="button"
                      variant={isEditing ? "ghost" : "outline"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Anulează" : "Editează"}
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="size-4" />
                              Nume complet
                            </FormLabel>
                            <FormControl>
                              <Input disabled={!isEditing} placeholder="Numele dvs. complet" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="size-4" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input disabled type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building className="size-4" />
                              Companie
                            </FormLabel>
                            <FormControl>
                              <Input disabled={!isEditing} placeholder="Numele companiei" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="size-4" />
                              Telefon
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={!isEditing}
                                placeholder="Numărul dvs. de telefon"
                                type="tel"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false)
                            form.reset()
                          }}
                        >
                          Anulează
                        </Button>
                        <Button type="submit">Salvează modificările</Button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AccountPage
