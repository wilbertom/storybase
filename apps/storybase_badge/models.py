"""
Storybase Badges

With this feature a content aggregator could mark stories with badges.
For example the "Denver Foundation Badge" symbolized that a member of the
Denver Foundation sponsored the story.

"""

from django.db import models


class Badge(models.Model):
    """
    A badge used to categorize, promote and sponsor stories.

    Every badge must have a name and a description used to
    when users want more information about what these mean.

    The icon uri is used to located to load the image on user interfaces.

    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon_uri = models.URLField()
