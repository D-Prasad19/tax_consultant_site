from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("services/", views.services, name="services"),
    path("about/", views.about, name="about"),
    path("faq/", views.faq, name="faq"),
    path("calculator/", views.calculator, name="calculator"),
    path("checklist/", views.checklist, name="checklist"),
    path("privacy-policy/", views.privacy_policy, name="privacy_policy"),
    path("terms/", views.terms, name="terms"),
    path("contact/", views.contact, name="contact"),
    path("thank-you/", views.thank_you, name="thank_you"),
]