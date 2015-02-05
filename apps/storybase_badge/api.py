
from tastypie.resources import ModelResource
from apps.storybase_badge.models import Badge


class BadgeResource(ModelResource):

    class Meta:
        queryset = Badge.objects.all()
        resource_name = 'badges'

