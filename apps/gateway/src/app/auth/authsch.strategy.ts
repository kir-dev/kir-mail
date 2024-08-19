import { AuthSchProfile, AuthSchScope, Strategy } from '@kir-dev/passport-authsch';
import { UserDto } from '@kir-mail/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AUTHSCH_AUTHORIZED_GROUPS, AUTHSCH_CLIENT_ID, AUTHSCH_CLIENT_SECRET } from '../../config';

@Injectable()
export class AuthSchStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientId: AUTHSCH_CLIENT_ID,
      clientSecret: AUTHSCH_CLIENT_SECRET,
      scopes: [AuthSchScope.PROFILE, AuthSchScope.PEK_PROFILE],
    });
  }

  async validate(userProfile: AuthSchProfile): Promise<UserDto> {
    if (!this.validateGroupMemberships(userProfile)) {
      return null;
    }

    return {
      displayName: userProfile.fullName,
    };
  }

  private validateGroupMemberships(profile: AuthSchProfile) {
    return [...profile.pek.activeMemberAt, ...profile.pek.alumniMemberAt].some((group) =>
      AUTHSCH_AUTHORIZED_GROUPS.includes(String(group.groupId))
    );
  }
}
