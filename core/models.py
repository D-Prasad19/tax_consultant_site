from django.db import models

class ContactSubmission(models.Model):
    TOPIC_CHOICES = [
        ("general", "General Tax Advisory"),
        ("itr", "Income Tax Return (ITR)"),
        ("gst", "GST Registration / Filing"),
        ("business", "Business Incorporation"),
        ("audit", "Tax Audit & Accounting"),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=120, blank=True)
    phone = models.CharField(max_length=20)
    topic = models.CharField(max_length=20, choices=TOPIC_CHOICES, default="general")
    message = models.TextField(max_length=1000)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.submitted_at:%Y-%m-%d})"