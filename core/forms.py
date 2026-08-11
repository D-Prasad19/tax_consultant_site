from django import forms
from django.core.validators import RegexValidator
from .models import ContactSubmission

phone_validator = RegexValidator(
    regex=r"^[0-9+\-\s()]{7,20}$", message="Enter a valid phone number."
)

class ContactForm(forms.ModelForm):
    phone = forms.CharField(required=True, validators=[phone_validator])
    email = forms.EmailField(required=False)

    class Meta:
        model = ContactSubmission
        fields = ["name", "phone", "email", "topic", "message"]
        widgets = {"message": forms.Textarea(attrs={"rows": 4})}

    def clean_message(self):
        message = self.cleaned_data["message"].strip()
        if len(message) < 10:
            raise forms.ValidationError("Message must be at least 10 characters.")
        return message