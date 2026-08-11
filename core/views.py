import logging
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .forms import ContactForm

logger = logging.getLogger(__name__)


# Helper to determine template paths consistently
def render_core(request, template_name, context=None):
    return render(request, f"core/{template_name}", context or {})


def index(request):
    return render_core(request, "index.html")


def services(request):
    return render_core(request, "services.html")


def about(request):
    return render_core(request, "about.html")


def faq(request):
    return render_core(request, "faq.html")


def calculator(request):
    return render_core(request, "calculator.html")


def checklist(request):
    return render_core(request, "checklist.html")


def privacy_policy(request):
    return render_core(request, "privacy_policy.html")


def terms(request):
    return render_core(request, "terms.html")


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            submission = form.save()

            # Send Email Alert
            subject = f"New Lead: {submission.name} ({submission.get_topic_display()})"
            body = (
                f"Client Name: {submission.name}\n"
                f"Phone: {submission.phone}\n"
                f"Email: {submission.email or 'N/A'}\n"
                f"Topic: {submission.get_topic_display()}\n\n"
                f"Message:\n{submission.message}\n"
            )
            try:
                send_mail(
                    subject=subject,
                    message=body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.NOTIFICATION_EMAIL],
                    fail_silently=False,
                )
            except Exception as e:
                logger.error(f"Failed to send lead email notification: {e}")

            return redirect("thank_you")
        else:
            messages.error(request, "Please correct the errors in the form below.")
    else:
        initial_topic = request.GET.get("topic")
        form = ContactForm(initial={"topic": initial_topic} if initial_topic else None)

    return render_core(request, "contact.html", {"form": form})


def thank_you(request):
    return render_core(request, "thank_you.html")

