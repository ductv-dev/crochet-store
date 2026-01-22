import { ProductPage } from "@/containers/product-page/page";

// Next.js 15 app router params are now promises in some configs but usually just object in simple setup or need await. 
// Assuming standard Next 14/13 behavior where params is object.
// If using latest canary, params might be a promise.
// Let's assume standard object for now or await it if strict.
// Safest is to treat it as possibly needing await if we were in server component doing async param access, but passing to client component is fine?
// Actually for server component page, props are { params: { id: string }, searchParams: ... }
// We accept it and pass ID.

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // Convert id to number
  const { id } = await params;
  const productId = Number(id);
  
  if (isNaN(productId)) {
      return <div>Invalid Product ID</div>;
  }

  return <ProductPage productId={productId} />;
}
