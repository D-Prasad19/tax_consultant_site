from django.contrib import admin
from .models import ContactSubmission

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "topic", "submitted_at")
    list_filter = ("topic", "submitted_at")
    search_fields = ("name", "phone", "email", "message")
    readonly_fields = ("submitted_at",)