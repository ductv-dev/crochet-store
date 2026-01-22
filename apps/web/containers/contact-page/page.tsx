"use client";


import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@workspace/ui/components/label";

export const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending
    setTimeout(() => {
        setLoading(false);
        toast.success("Message sent successfully! We'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
       {/* Header */}
       <section className="py-12 md:py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4 text-center">
             <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
             <p className="text-lg text-muted-foreground">
                Have a question about a custom order or just want to say hi? We'd love to hear from you.
             </p>
          </div>
       </section>

       <section className="py-12 md:py-20 container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
             {/* Contact Info */}
             <div className="space-y-6">
                <Card>
                   <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Our team is here to help.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      <div className="flex items-start gap-3">
                         <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                         <div>
                            <p className="font-medium">Store Location</p>
                            <p className="text-sm text-muted-foreground">123 Crochet Lane, Craftsville<br/>Vietnam 10000</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                         <div>
                            <p className="font-medium">Email Us</p>
                            <p className="text-sm text-muted-foreground">hello@crochetstore.com</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                         <div>
                            <p className="font-medium">Call Us</p>
                            <p className="text-sm text-muted-foreground">+84 90 123 4567</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-3">
                         <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                         <div>
                            <p className="font-medium">Business Hours</p>
                            <p className="text-sm text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 10:00 AM - 4:00 PM</p>
                         </div>
                      </div>
                   </CardContent>
                </Card>

                {/* Map Placeholder */}
                <div className="aspect-video w-full bg-muted rounded-xloverflow-hidden relative rounded-xl border">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.97785449839!2d105.79576392576326!3d21.02273601628172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7huqFpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1706240000000!5m2!1svi!2s" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                </div>
             </div>

             {/* Form */}
             <div className="lg:col-span-2">
                <Card className="h-full">
                   <CardHeader>
                      <CardTitle>Send us a Message</CardTitle>
                      <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                   </CardHeader>
                   <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <Label htmlFor="name">Your Name</Label>
                               <Input id="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                               <Label htmlFor="email">Email Address</Label>
                               <Input id="email" type="email" placeholder="john@example.com" required />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Custom Order Inquiry" required />
                         </div>
                         <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Tell us about what you're looking for..." className="min-h-[150px]" required />
                         </div>
                         <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                            {loading ? "Sending..." : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </>
                            )}
                         </Button>
                      </form>
                   </CardContent>
                </Card>
             </div>
          </div>
       </section>
    </div>
  );
};
