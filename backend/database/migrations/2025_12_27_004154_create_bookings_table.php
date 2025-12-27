<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // Contractor information
            $table->string('contractor_name');
            
            // Artist information from Deezer API
            $table->string('artist_id'); // Keeping as string to be safe with external APIs
            $table->string('artist_name');
            $table->text('artist_image_url')->nullable();
            
            // Event details
            $table->decimal('cache_amount', 10, 2)->nullable();
            $table->date('event_date');
            $table->text('event_address')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};