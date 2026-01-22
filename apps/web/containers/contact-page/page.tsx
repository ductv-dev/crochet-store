import React from "react";

export const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-4">
        We'd love to hear from you. Reach out to us for any inquiries.
      </p>
      <div className="grid gap-4">
          <div>
              <h3 className="font-semibold">Email</h3>
              <p>support@crochetstore.com</p>
          </div>
          <div>
              <h3 className="font-semibold">Phone</h3>
              <p>+1 (555) 123-4567</p>
          </div>
      </div>
    </div>
  );
};
