<?php

namespace App\Mail;


use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StoreProductNotification extends Mailable
{
    use Queueable, SerializesModels;

    private Product $product;

    /**
     * Create a new message instance.
     */
    public function __construct(Product $product)
    {
    $this->product = $product->load('category'); 
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Store Product Mail',
        );
    }

    public function build()
    {
      return $this->view('emails.product-notification', [
        'product' => $this->product
      ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
