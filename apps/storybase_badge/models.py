"""
Storybase Badges

With this feature a content aggregator could mark stories with badges.
For example the "Denver Foundation Badge" symbolized that a member of the
Denver Foundation sponsored the story.

"""

from django.db import models
from apps.storybase.models import PermissionMixin


class BadgePermission(PermissionMixin):
    """
    We don't want everyone to be able to delete and add badges. They
    are used to aggregate content, certain people will have certain
    badges.

    """

    def _can_edit(self, user):
        """
        We assume that if someone can add a badge to a story,
        then they can remove it from it.

        This assumption might be false some day so don't use this
        method directly.

        """
        return user.is_staff

    def can_add(self, user):
        """
        Can the user add the badge?
        """
        return self._can_edit(user)

    def can_remove(self, user):
        """
        Can the user remove the badge?
        """
        return self._can_edit(user)


class Badge(models.Model, BadgePermission):
    """
    A badge used to categorize, promote and sponsor stories.

    Every badge must have a name and a description used to
    when users want more information about what these mean.

    The icon uri is used to located to load the image on user interfaces.

    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_uri = models.URLField()
