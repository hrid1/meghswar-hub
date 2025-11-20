"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

// -------------------- VALIDATION SCHEMA --------------------

const RiderSchema = z.object({
  name: z.string().min(2),
  licenseNumber: z.string().min(2),
  bikeType: z.string().min(2),
  mobile: z.string().min(10),
  guardianMobile: z.string().min(10),
  nidNumber: z.string().min(5),
  email: z.string().email(),
  presentAddress: z.string().min(3),
  permanentAddress: z.string().min(3),
  fixedSalary: z.string().min(1),
  commission: z.string().min(1),
});

type RiderFormType = z.infer<typeof RiderSchema>;

// -------------------- FILE UPLOAD COMPONENT --------------------

function FileUpload({ label, value, onChange }: any) {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 bg-muted/30">
      <Label>{label}</Label>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="hidden"
        id={label}
      />

      <label
        htmlFor={label}
        className="w-full border border-dashed flex flex-col items-center justify-center py-6 rounded-md cursor-pointer"
      >
        {value ? (
          <>
            <img
              src={URL.createObjectURL(value)}
              alt="doc"
              className="h-28 object-cover rounded mb-2"
            />
            <p className="text-sm text-muted-foreground">Click to change</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Upload File</p>
          </>
        )}
      </label>
    </div>
  );
}

// -------------------- MAIN FORM --------------------

export default function RiderRegistrationForm() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [documents, setDocuments] = useState({
    nidFront: null,
    nidBack: null,
    licenseFront: null,
    licenseBack: null,
    mfsFront: null,
    mfsBack: null,
  });

  const form = useForm<RiderFormType>({
    resolver: zodResolver(RiderSchema),
    defaultValues: {
      name: "Ahmed Wasi",
      licenseNumber: "DH-38239",
      bikeType: "Motor Bike",
      mobile: "+8801234567890",
      guardianMobile: "+8801234567890",
      nidNumber: "8814028693",
      email: "wasi@email.com",
      presentAddress: "72/5 Bashundhara Avenue, Dhaka",
      permanentAddress: "72/5 Bashundhara Avenue, Dhaka",
      fixedSalary: "1187",
      commission: "1187",
    },
  });

  const onSubmit = (values: RiderFormType) => {
    console.log("Form Values:", values);
    console.log("Profile Image:", profileImage);
    console.log("Documents:", documents);
    alert("Rider successfully created!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-5xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center ">
            Rider Registration Form
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* PROFILE IMAGE */}
            <div className="flex justify-center">
              <div className="relative">
                <label htmlFor="profilePhoto">
                  <div className="w-28 h-28 rounded-full border border-dashed flex items-center justify-center cursor-pointer bg-muted/20 overflow-hidden">
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                />

                {profileImage && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => setProfileImage(null)}
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* INPUT FIELDS */}
            <div className="grid md:grid-cols-2 gap-6 gap-x-15">
              {Object.entries({
                name: "Rider's Name",
                licenseNumber: "License Number",
                bikeType: "Bike Type",
                mobile: "Mobile Number",
                guardianMobile: "Guardian Mobile",
                nidNumber: "NID Number",
                email: "Email",
                presentAddress: "Present Address",
                permanentAddress: "Permanent Address",
                fixedSalary: "Fixed Salary",
                commission: "Commission",
              }).map(([name, label]) => (
                <div key={name}>
                  <Label>{label}</Label>
                  <Input
                    {...form.register(name as keyof RiderFormType)}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>

            {/* DOCUMENT SECTIONS */}
            <div className="grid md:grid-cols-2 gap-4 gap-x-15">
              <FileUpload
                label="NID Front"
                value={documents.nidFront}
                onChange={(f: any) =>
                  setDocuments({ ...documents, nidFront: f })
                }
              />
              <FileUpload
                label="NID Back"
                value={documents.nidBack}
                onChange={(f: any) =>
                  setDocuments({ ...documents, nidBack: f })
                }
              />
              <FileUpload
                label="License Front"
                value={documents.licenseFront}
                onChange={(f: any) =>
                  setDocuments({ ...documents, licenseFront: f })
                }
              />
              <FileUpload
                label="License Back"
                value={documents.licenseBack}
                onChange={(f: any) =>
                  setDocuments({ ...documents, licenseBack: f })
                }
              />
              <FileUpload
                label="MFS Front"
                value={documents.mfsFront}
                onChange={(f: any) =>
                  setDocuments({ ...documents, mfsFront: f })
                }
              />
              <FileUpload
                label="MFS Back"
                value={documents.mfsBack}
                onChange={(f: any) =>
                  setDocuments({ ...documents, mfsBack: f })
                }
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button type="submit" className="w-full bg-orange-600">
              Create Rider
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
