from django.contrib import admin
from apps.storybase_badge.models import Badge


class BadgeAdmin(admin.ModelAdmin):
    pass

admin.site.register(Badge, BadgeAdmin)
