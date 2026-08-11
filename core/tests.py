from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from .models import ContactSubmission
from .forms import ContactForm

class CoreViewsTest(TestCase):
    def test_pages_load_successfully(self):
        url_names = ['index', 'services', 'about', 'faq', 'calculator', 'checklist', 'privacy_policy', 'terms', 'thank_you']
        for name in url_names:
            response = self.client.get(reverse(name))
            self.assertEqual(response.status_code, 200)

    def test_contact_form_valid_submission(self):
        data = {
            'name': 'Rahul Sharma',
            'phone': '+91 9876543210',
            'email': 'rahul@example.com',
            'topic': 'itr',
            'message': 'Requesting assistance with salary ITR filing.'
        }
        response = self.client.post(reverse('contact'), data)
        self.assertRedirects(response, reverse('thank_you'))
        self.assertEqual(ContactSubmission.objects.count(), 1)

    def test_contact_form_invalid_message_length(self):
        data = {
            'name': 'Short Msg',
            'phone': '1234567890',
            'message': 'Short' # Less than 10 chars
        }
        response = self.client.post(reverse('contact'), data)
        self.assertEqual(response.status_code, 200)
        self.assertFormError(response.context['form'], 'message', 'Message must be at least 10 characters.')